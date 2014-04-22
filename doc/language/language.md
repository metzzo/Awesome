# Awesome
Awsome is an awesome programming language written in JavaScript.
It aims to achieve the following goals:
 * Powerful syntax, but yet easy to learn and understand
 * Wide range of possible backends. Currently there is just one backend in development: JavaScript

The language is case insensitive. Instead of \n you can also use ; as a line seperator.

## Type Concept
Awesome is a strongly typed programming language. 
It has the following built in data types:
 * integer: 8 byte fixed point number
 * float: 8 byte floating point number
 * bool: 1 bit flag
 * character: 2 byte character
 * string: sequence of characters
 * function: Callable piece of code
 * object: set of multiple data types

Every Datatype can be collected in an array.

The conversation between data types follow the following rules:
 * integer converts to float, string
 * float converts to integer, string
 * bool converts to string
 * string converts to nothing
 * function converts to nothing
 * object converts to string (calling toString)
 
## Scoping
The scoping of awesome is using the traditional Java / C# system in which a function starts a new scope and every statement (if, for, while, ...) too. Variables declared in a function are only acessible within the function and they cannot access any "upper" variables.
 
 
## Syntax
### Basic Statements
```
if expression then
  
end

if expression then

else if expression then

else

end

-- Loops
while expression do -- traditional "while" loop
  
end

for i in range(0, 10) do -- traditional "foor" loop, range is a coroutine iterating from 0 to 10
  
end

repeat

until expression -- traditional "do - while" loop

-- error handling
try
  rise new ArgumentError
catch ArgumentError e
  
end

-- select
select expression
  case expression
  
  case expression
  
  case expression
  
  default

end

```

### Variables
```
var myVariable = 10 -- Implicit data types
var myVariable2 is int -- explicit data types
var myVariable3 is float -- explicit data types
var myVariable4 is string -- explicit data types
var as int a, b, c -- use one default datatype for all

const myConst = 100 -- not mutatable


var myArray is array of int = new int[20] -- int array
var myArrayBig is array of array of int = new int[20][10] -- 2 dim array


```

### Functions
Calling a function may be with or without brackets. If a function is used as a statement (therefore the return parameter is ignored), you do not need to write brackets, otherwise you have to.
```
var myAddFunction = function(param1 as int, param2 as int)
  return param1 + param2
end

var mySubFunction is function(int, int) = (p1, p2) -> return p1-p2

myAddFunction = mySubFunction -- works because they both have the same signature

-- Note: Functions are inmutable: they cannot be changed in any way


var myCoroutine = function()
  yield return 1 -- yield return tells the compilter/environment that the current execution of this function should be stopped and can be continued at a later time. yield return cannot be used in properties/constructors/.. 
  yield return 2
  yield return 3
end


-- using coroutines
for i in myCoroutine()
  print "Value "+i
end

```

### OOP
```
class Car
  private
    var distance is float
    
  public
    function Car
      my.distance = 0
    end
    
    function drive(dist is float)
      my.distance += dist
    end
    
  protected
    -- protected fields, that are accessible to only classes that extend this class
end

class SuperCar extends Car
  public
    function drive(dist is float)
      super.drive(dist)
      super.driver(dist)
    end
    
    function iterate() -- this function is called whenever this object is used in a "for in" loop
      yield return 1
      yield return 2
      yield return 3
    end
end

var swagCar = new SuperCar
swagCar.drive 10
swagCar.drive 20
--cast:
var normalCar is car = car(swagcar) // cast SuperCar to car

-- Property Example
class Vector
  private
    var x is float, y is float
  
  public
    property PositionX
      get x
      set x = value
    end
    property PositionY
      get
        return y
      end
      set
        y = value
      end
    end
end
```

### Autonomous Variables/Functions
This is a new conecpt I would like to implement into Awesome. It is a concept that has some similarities to data-flow based programming.
It basically states, that variables recalculate their value depending on the value of other variables or functions are called whenever the value changes. This system basically removed the need of function/method/variable pointers int he language, while still maintaining a powerful syntax.
Example:
```
var a as int, b as int
a => b
a = 10
```
This is a very basic example of this programming style. Whenever the value of a changes, the value of b automatically adjust - b is an autonomous variable.
The return type of '=>' is a handle containing the object that references to the connection.


Of course this is not useful, as it is right now, let me give you a more useful example:
```
var a, b
a => (a) -> print "Value of a " + a
a = 10
```
Whenever the value of 'a' changes, the lambda is called with the parameter of the value of a.

Chaining of autonomous variables is also possible:
```
var as int a, b
a => ((x) -> sleep(1000); return x) => b
a = 1000
```
Whenever a is assigned a value, b also is assigned the value, after 1 second of waiting time.
 
This system is very useful for games or UI based applications, here is an example
```
-- some UI application
var as UIButton myButton = new UIButton, otherButton = new UIButton
myButton.clicked => ((x) -> print "Hello World")

-- some game application
var myPlayer as Player = new Player

input.key_left => myPlayer.x = myPlayer.x - 2
input.key_right => myPlayer.x = myPlayer.x + 2
```

Another useful feature this can be used for, is the block chaining function, which allows threaded operations:
```
var as int a
a => {
  (x) -> sleep(20); return 20
  (y) -> sleep(200); return 200
  (z) -> sleep(300); return 300
} => (a) -> print "x: "+a
```
The block chains are multiple commands, that are executed parallel in another thread. The results of the functions are collected in an array which are given as an argument to the lambda function.
You have to keep in mind that this feature could be too complex to implement given the strict nature of JavaScripts WebWorker.


Removing auotnomous variables is also possible
```
var as int a, b
var handle = a => b
handle.unlink -- unlinks the connection
handle.trigger -- triggers the connection, causing b to be recalculated
handle.add -- adds a connection to this connection, which are then autonomous

```

Possible connections are:
 * variable -> variable: Whenever the value of the left operand changes, it is automatically set to the right operand.
 * variable -> function: Whenever the value of the left operand changes, the function of the right operand called, the parameter being the value of the left operand
 * function -> function: Whenever the value of the left operand is called and the execution is ended, the function on the right operand is called with the parameter being the return type of the left operand. You can combine this with yield return

### Possible Features
#### Likely
 * Generics
 * Extension Methods
 * Interface
 * namespace/package system
 * Abstract classes/functions
 * Closures
 * Duck Typing in functions => create new functions as soon as it is used with a new datatype
 * Enums
 * Break / Continue in loops
 * Multiple Return

#### Not so likely
 * Indexer
 * Operatoroverloading
 * Static classes
 * Annotations