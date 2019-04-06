/**
    shearsort.h
    Purpose: Function Declarations for the shearsort.cpp file

    @author Jameel Kelley
    @version 1.0 3/15/2019
*/
#include <string>

/**
    Returns the area of a circle with the specified radius.

    @param radius The radius of the circle.
    @return The area of the circle.
*/
void* worker_thread(void *arg);
/**
    Returns the evaluation of if a integer is a perfect square

    @param x a integer
    @return True if x is a perfect square, false otherwise
*/
bool is_perfect_square(int x);
/**
    Function to read a file into a int pointer array of int pointers

    @param filename the filename that you want to read in
    @return The double pointer matrix that was created from the file filename
*/
int** read_input(std::string filename);
/**
    Frees the allocated memory for the global arr matrix

    @param The double pointer array
*/
void free_arr(int** arr);
/**
    Function to print the arrary matrix to std out.

    @param arr The double pointer array to print
    @param phase The current phase of the algorithm
*/
void print_arr(int** arr,int phase);
/**
    Function to swap the memory location of two pointers

    @param a The first number pointer
    @param b The second number pointer
*/
void swap(int* a, int* b);
/**
    Function to do a bubble sort on a array of intergers

    @param a The double pointer array to sort
    @param reversed to sort in acending or decending array
*/
void bubble_sort(int* arr, bool reversed);
