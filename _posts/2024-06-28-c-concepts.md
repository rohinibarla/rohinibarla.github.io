---
layout: post
title: "C Concepts"
date: 2024-06-28 06:20
comments: false
categories:
draft: false
---
  
Here is an example using `while` loop.  

```c
#include <cs50.h>
#include <stdio.h>

int main(void)
{
    // variable declaration
    int count, counter;

    // reading input from keyboard
    count = get_int("Upto how many numbers you want to print? ");
    
    counter = 1;
    while (counter <= count)
    {
        printf("%i ", counter);
        counter = counter + 1;
    }
    printf("\n");
}
```