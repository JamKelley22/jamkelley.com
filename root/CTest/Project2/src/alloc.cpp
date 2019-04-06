#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <iostream>
#include <fstream>
#include <cmath>
#include <string>
#include <vector>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>

int _num = 0;

struct res {
	int type;
	int units;
};

/*
std::vector<res> read_res(std::string filename);
void print_res(std::vector<res> r);
long int get_file_size(std::string filename);
*/
int open_res(std::string filename, struct stat *sb);
void cleanup(char *addr, long int length, int fd);

int main()
{
	char *addr;
	int fd = 0;
	struct stat sb;
	long int length;
	ssize_t s;

	// Open res
	fd = open_res("res.txt",&sb);
	// Set file length
	length = (long int)sb.st_size;
	// Map file to memory region
	addr = static_cast<char*>(mmap(NULL, length, PROT_READ,MAP_PRIVATE, fd, 0));
	if (addr == MAP_FAILED) {
	 perror("mmap");
	 exit(EXIT_FAILURE);
 	}
	// Write to STDOUT
	s = write(STDOUT_FILENO, addr, length);
	if (s != length) {
		if (s == -1) {
		 perror("write");
		 exit(EXIT_FAILURE);
		}

		fprintf(stderr, "partial write");
		exit(EXIT_FAILURE);
	}

	cleanup(addr, length, fd);

	/*
	long int file_size = 0;

	// opens res.txt
	int fd = open("res.txt".c_str(), O_RDONLY);
	if (fd == -1) {
		perror("Open");
		exit(EXIT_FAILURE);
	}

	file_size = get_file_size(fd);
	if(file_size == -1) {
		perror("File Size");
		exit(EXIT_FAILURE);
	}
	*/
}
int open_res(std::string filename, struct stat *sb) {
	// Open res.txt
	int fd = open(filename.c_str(), O_RDONLY);
	if (fd == -1) {
		perror("Open");
		exit(EXIT_FAILURE);
	}
	// Get file size
	if (fstat(fd, sb) == -1) {
	 perror("fstat");
	 exit(EXIT_FAILURE);
 	}
	return fd;
}

void cleanup(char *addr, long int length, int fd) {
	// Unmap file from memory
	munmap(addr, length);
	//Close file
	close(fd);
	exit(EXIT_SUCCESS);
}

/*
std::vector<res> read_res(std::string filename) {
	std::vector<res> r;
	std::ifstream input(filename.c_str());
	std::ifstream counter(filename.c_str());
	if(!input.is_open() || !counter.is_open()) {
		std::cout << "File " << filename << " not opened\n";
		return r;
	}
	int num_lines = 0, a = 0, b = 0;
	while (counter >> a >> b) { num_lines++; }

	//res *r = (res*)malloc(num_lines * sizeof(res));
	for(int i = 0; input >> a >> b; i++) {
		r.push_back({a,b});
	}
	return r;

}

void print_res(std::vector<res> r) {
	for(std::size_t i=0; i<r.size(); ++i)
		std::cout << r[i].type << "\t" << r[i].units << std::endl;
}

long int get_file_size(int fd) {
	struct stat sb;

	if (fstat(fd, &sb) == -1) {
		perror("stat");
		return -1;
		//exit(EXIT_FAILURE);
	}

	return (long int)sb.st_size;
}
*/
