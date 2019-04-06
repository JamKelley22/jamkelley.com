/**
    shearsort.cpp
    Purpose: A program written in C++ to preform a shearsorting mesh algorithm
    on an input text file in the form of a square matrix, space seperated.

    Ex.

    1 3 4 2
    6 33 5 -1
    2 5 6 0
    99 12 2 7

    @author Jameel Kelley
    @version 1.0 3/15/2019
*/
#include <pthread.h>
#include <iostream>
#include <fstream>
#include <cmath>
#include <string>
#include "shearsort.h"

//Global Vars
//The size of one size of the matrix
int _size = 0;
//The number of done threads waiting
int _done = 0;
//The curent phase of the mesh sorting
int _phase = 0;
//The total numner of phases to do
int _numPhases = 0;
//The double pointer arr holding the matrix from input.txt
int** _arr;
//A testing bool to filter output
bool _debug = false;

//Pthread mutex varable
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

//Pthread condition varables
//To broadcast threads waiting to main
pthread_cond_t cond_threads_waiting = PTHREAD_COND_INITIALIZER;
//To broadcast phase is done to threads
pthread_cond_t cond_phase_done = PTHREAD_COND_INITIALIZER;

int main(int argc, char* argv[])
{
    //Here I handle any arguements. If one arguement (argc = 2)
    //then I read input from there and consider it a debug run
    if(argc == 2) {
        //Read ints into 2D array from input.txt
        _arr = read_input(argv[1]);
        _debug = true;
    }
    //otherwise its normal and reads from input.txt at current working dir
    else if(argc == 1) {
        //Read ints into 2D array from input.txt
        _arr = read_input("input.txt");
    }
    else {
        //Invalid num of args
        std::cout << "Error: Too many arguements" << std::endl;
        return -1;
    }

    if(_debug)
        std::cout << "Input File: " << argv[1] << std::endl;

    if(_arr == NULL) {
        //An error Occured in the read_input function and was displayed to std out in that function
        //This just breaks out of main
        std::cout << "Error Occured: check above lines" << std::endl;
        return -1;
    }

    //Print the Initial matrix, (-1 just specisifes the title[Initial])
    print_arr(_arr,-1);
    //Calculate Num Phases
    _numPhases = (int)(log(_size * _size) / log(2)) + 1;
    //Malloc space for N threads
    pthread_t *threads = (pthread_t*)malloc(_size * sizeof(pthread_t));
    //Create N threads
    for(int t = 0; t < _size; t++) {
        pthread_create( &threads[t], NULL, worker_thread, (void*)(long)t );
    }

    //Loop through all phases caluated before
    for(_phase = 1; _phase <= _numPhases; _phase++) {
        //We will be manipulateing a varable also used in worker thread, lock mutex
        pthread_mutex_lock(&mutex);//==========Lock
        while(_done < _size) {
            //While not all threads are done we will continue to wait until the threads are
            //finished with sorting the rows and cols
            pthread_cond_wait(&cond_threads_waiting,&mutex);
        }
        if(_debug) {
            printf( "[thread main] done == %d\n", (int)_size );
        }
        //set number of done threads to 0 since we are all done
        _done = 0;
        //broadcast to all threads that this phase is completed (all threads have finished)
        pthread_cond_broadcast(&cond_phase_done);
        print_arr(_arr,_phase);
        //Done modifying shared vars, unlock mutex
        pthread_mutex_unlock(&mutex);//========Unlock

    }
    //program done, do cleanup free of malloc
    free_arr(_arr);
    return 0;
}

/**
    Returns the area of a circle with the specified radius.

    @param radius The radius of the circle.
    @return The area of the circle.
*/
void* worker_thread(void *arg)
{
    const int myid = (long)arg; // force the pointer to be a int
    //Enumerate all phases
    for(int phase = 1; phase <= _numPhases; phase++) {
        if(_debug)
            printf( "[thread %d] working (%d/%d)\n", myid, phase, _numPhases );

        //For the even threads
        if(phase % 2 == 0) {
            //Preform Column sorting on them
            //Make size for new array that will hold column numbers to make sorting easier
            int* colArr = (int*)malloc(_size * sizeof(int));
            //Fill that new array with that col
            for(int i = 0; i < _size; i++) {
                colArr[i] = _arr[i][myid];
            }
            //Preform a sort on the pointers of that arr
            bubble_sort(colArr, true);
            //Refil the locations of the main matrix
            for(int i = 0; i < _size; i++) {
                _arr[i][myid] = colArr[i];
            }
        }
        else {
            //Preform Row sorting on them
            //If the row is even, do a accending bubble sort, otherwise do decending
            if(myid % 2 == 0)
                bubble_sort(_arr[myid],true);
            else
                bubble_sort(_arr[myid],false);
        }


        //Were going to manipulate done and use the cond, so we need the mutex
        pthread_mutex_lock( &mutex );

        // increase the num of threads finished
        _done++;
        //Alert main thread that this thread is done
        pthread_cond_broadcast(&cond_threads_waiting);//Might be better to be a signal here?
        //Wait for main thread to broadcast that next phase is up before continuing
        pthread_cond_wait(&cond_phase_done,&mutex);
        //Done with condition and shared vars, unlock
        pthread_mutex_unlock(&mutex);
    }
    return NULL;
}

/**
    Returns the evaluation of if a integer is a perfect square

    @param x a integer
    @return True if x is a perfect square, false otherwise
*/
bool is_perfect_square(int x)
{
      //Get sqrt as double
      double sr = sqrt(x);
      //check to see if number and its rounded down are the same, if so its a perfect square
      return ((sr - floor(sr)) == 0);
}

/**
    Function to read a file into a int pointer array of int pointers

    @param filename the filename that you want to read in
    @return The double pointer matrix that was created from the file filename
*/
int** read_input(std::string filename) {
    //Create streams to read the file in. One reader, one pre-counter
    std::ifstream input(filename.c_str());
    std::ifstream counter(filename.c_str());
    //Error handelings
    if(!input.is_open() || !counter.is_open()) {
        std::cout << "File " << filename << " not opened\n";
        return NULL;
    }
    //Initialize counting and storage of values
    int cnt = 0, a = 0;
    //Count
    while (counter >> a) { cnt++; }
    //Check to make sure cnt is a perfect square
    if(!is_perfect_square(cnt)) {
        std::cout << "Input is not a perfect square\n";
        return NULL;
    }
    //Get the size of one side of matrix
    _size = sqrt(cnt);

    //Allocate space for matrix array
    int **arr = (int **)malloc(_size * sizeof(int *));
    //Allocate space for each array in matrix
    for(int i = 0; i < _size; i++) {
        arr[i] = (int *)malloc(_size * sizeof(int));
    }
    //Fill matrix
    for(int i = 0; input >> a; i++) {
        arr[i/_size][i%_size] = a;
    }
    return arr;
}

/**
    Frees the allocated memory for the global arr matrix

    @param The double pointer array
*/
void free_arr(int** arr) {
    //Free the rows of matrix
    for(int i = 0; i < _size; i++) {
        free(arr[i]);
    }
    //Free the holder arr
    free(arr);
}

/**
    Function to print the arrary matrix to std out.

    @param arr The double pointer array to print
    @param phase The current phase of the algorithm
*/
void print_arr(int** arr, int phase) {
    //Print phase depending on phase num
    if(phase > 0)
        std::cout << "=====Phase " << phase << "=====" << std::endl;
    else if(phase == 0)
        std::cout << "=====Final=====" << std::endl;
    else if(phase == -1)
        std::cout << "=====Initial=====" << std::endl;

    //Print out matrix with tabs
    for(int i = 0; i < _size; i++) {
        for(int j = 0; j < _size; j++) {
            std::cout << arr[i][j] << "\t";
        }
        std::cout << std::endl;
    }
}

/**
    Function to swap the memory location of two pointers

    @param a The first number pointer
    @param b The second number pointer
*/
void swap(int* a, int* b) {
    //Assign a to temp space
    int temp = *a;
    //swap
    *a = *b;
    //reassign temp to b
    *b = temp;
}

/**
    Function to do a bubble sort on a array of intergers

    @param a The double pointer array to sort
    @param reversed to sort in acending or decending array
*/
void bubble_sort(int* arr, bool reversed) {
    //Sort in either reversed or not reversed (acending or decending)
    if(!reversed) {
        //Itterate through arr
        for(int i = _size - 1; i >= 0; i--) {
            //Second itteration
            for(int j = 0; j < _size; j++) {
                //If current val is less than next, swap
                if(arr[j] < arr[j+1]) {
                    swap(&arr[j],&arr[j+1]);
                }
            }
        }
    }
    else {
        //Same as above but reversed
        for(int i = 0; i < _size - 1; i++) {
            for(int j = 0; j < _size - i - 1; j++) {
                if(arr[j] > arr[j+1]) {
                    swap(&arr[j],&arr[j+1]);
                }
            }
        }
    }
}
