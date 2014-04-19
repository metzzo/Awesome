# Awesome
Awsome is an awesome programming language written in JavaScript.
It aims to achieve the following goals:
 * Powerful syntax, but yet easy to learn and understand
 * Wide range of possible backends

The language is case insensitive.

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

### Message Oriented Programming
Awesome has a flexible messaging system built in. Not sure if it will be implemented in this current iteration
```
class PlayerCreated
  
end

-- is always called if the PlayerCreated message is sent
var myMessageHandler1 = function(param1 as int, param2 as int) receives PlayerCreated
  print "Player Created 1"
end 

-- is always called if the PlayerCreated message is sent
var myMessageHandler1 = function(param1 as int, param2 as int) receives PlayerCreated
  print "Player Created 1"
end 

send new PlayerCreated // sends the event

```

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

#### Not so likely
 * Indexer
 * Operatoroverloading
 * Static classes
 * Annotations