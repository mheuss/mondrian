# Mondrian Art Generator

This is a simple Mondrian Art Generator that generates a random Mondrian-style art piece. The page 
refreshes every two seconds to give you another design.

### Random Number Generation Credit

In this code, I make use of a seeded random number generator that can be found here:
https://github.com/DomenicoDeFelice/jsrand

Javascript natively uses a random number generator that is not seedable. That leads to the 
unfortunate problem that each frame drawn in p5 - and there are 30 drawn per second - would 
generate a new and unique pattern. 

By using a seeded generator, I am able to provide a seed that will generate the same set
of random numbers each time it is called. 
