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
The scoping of awesome is using the traditional Java / C# system in which a function starts a new scope and every statement (if, for, while, ...) too. Variables declared in a function are only acessible within the function and they cannot access any "upper" variables. Closures may be supported in future releases.
 
 
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
while expression do -- traditional "while" loop, do is optional
  
end

for i in 0 to 10 do -- traditional "foor" loop, "to" operator returns a coroutine that iterates from 0 to 10.
  
end

for i in 0 to 10 step 2 -- only iterate 0,2,4,6,8,10

end

repeat

until expression -- traditional "do - while" loop

-- error handling
try
  rise new ArgumentError
catch ArgumentError
  -- the local variable 'exception' with the exception object is available here
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
var is int a, b, c -- use one default datatype for all

const myConst = 100 -- not mutatable

var myArray is array of int = new array[10] of int -- int array
var myArrayBig is array of array of int = new array[20] of array[10] of int -- 2 dim array
```

### Functions
Calling a function may be with or without brackets. If a function is used as a statement (therefore the return parameter is ignored), you do not need to write brackets, otherwise you have to.
```
var myAddFunction = function(param1 as int, param2 as int)
  return param1 + param2
end

var mySubFunction is (int, int) returns int = (p1 is int, p2 is int) -> return p1-p2

myAddFunction = mySubFunction -- works because they both have the same signature

-- Note: Functions are inmutable: they cannot be changed in any way


var myCoroutine = function()
  yield 1 -- yield tells the compilter/environment that the current execution of this function should be stopped and can be continued at a later time. yield cannot be used in properties/constructors/.. 
  yield 2
  yield 3
end


-- using coroutines
for i in myCoroutine() -- if given an object / array /.. it automatically calls the 'iterate' function/method of this object
  print "Value "+i
end

-- Duck Typing functions
function foo(bar)
  return bar*2
end
foo 10 -- parameter is implicitly backtracked, creates a new function, if the datatype is not explicitly defined
foo 30.4

function foo2()

end

var f = foo2


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
      yield 1
      yield 2
      yield 3
    end
end

var swagCar = new SuperCar
swagCar.drive 10
swagCar.drive 20
--cast:
var normalCar is car = swagcar.toCar -- every object has the implicit "toXYZ" methods that cast to the expected class

-- Property Example
class Vector is final, public -- "is acces_modifier" says how this class can be access
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

-- Generic Example
class List of Type
  private
    var data, ptr
  
  public 
    function new()
      data = new array of Type(100)
    end
  
    function push(value)
      data[ptr] = value
      ptr = ptr + 1
    end
    
    function pop()
      var result = data[ptr]
      ptr = ptr - 1
      return result
    end
end

var myList = new list
myList.add 10
myList.add "Hello World" -- error

class Map of Key, Value
  -- etc
end

var map = new map of int, string

var otherList = new list of int -- explicit definition of the parameter type
```

### Data Flow
Variables recalculate their value depending on the value of other variables or functions. This system basically removes the need of function/method/variable pointers in the language, while still maintaining a powerful syntax. 

Example:
```
var a as int, b as int
a => b
a = 10
```
This is a very basic example of this programming style. Whenever the value of 'a' changes, the value of b automatically adjusts.
The return type of '=>' is 'b', so data flows can be chained toghether

A more useful application of this system would be:
```
var a, b
a => (a) -> print "Value of a " + a
a = 10
```
Whenever the value of 'a' changes, the lambda is called with the parameter of the value of a.

Chaining of data flows is also possible:
```
var as int a, b
a => ((x) -> return x*10) => b
a = 1000
```
Whenever a is assigned a value, b also is assigned a recalculated value
 
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

Possible connections are:
 * variable -> variable: Whenever the value of the left operand changes, it is automatically set to the right operand.
 * variable -> function: Whenever the value of the left operand changes, the function of the right operand called, the parameter being the value of the left operand
 * function -> function: Whenever the value of the left operand is called and the execution is ended, the function on the right operand is called with the parameter being the return type of the left operand. You can combine this with yield

#### Threading
Proper multithreading support is something JavaScript lacks and is more than ever needed. Awesome seeks to solve this problem by introducing the "task" expression: task () -> ACTION

The simplest form of threaded brackets is the following:
```
var thread =  task (input) -> veryLongTask()
thread(10)

```
A threaded routine can be started by calling it and parameters are also sent. Note: Any parameter sent to a thread must be JSONable, they are transmitted by value.

To get results from a thread one has to use the data flow operator in order to receive the values:
```
var thread = ( task (input) -> begin
  while input > 0
    veryLongTask()
    yield input
    input = input - 1
  end
end ) => (x) -> print x
```

To communicate with a threaded function you have to use the 'request' keyword. This keywords halts the current execution until the next value is posted into the thread. The data type that is emitted into the thread must be consistent.
```
var thread = task (input) -> begin
    var value
    while true
      request value
      
      value = veryLongTask(value)
      yield value
    end
  end

thread.emit 1
thread.emit 2
thread.emit 'hello'  -- throws a syntax error, because post has to be consistent

thread => (x) -> print 'Result!'
thread();
```


If you want to wait for a certain threaded routine to be finished, you may use the 'wait for' keyword inside a thread. This executes the defined threaded routine and halts the execution of the current thread until it is finished. If a threaded routine returns a value via 'yield' the value is ignored, until a value which is returns with 'return' is received.
```
var thread = task (input) -> begin
  var a, b, c
  
  a = wait for task () -> return veryLongTask()
  b = wait for task () -> return veryLongTask()
  c = wait for task () -> return veryLongTask()
  return a + b +c
end

thread => (x) -> print 'FINISHED'
thread()
```
NOTE: THIS FEATURE MAY BE UNNECESSARY, because the data flow operator offers similar functionality, so it may not be implemented or be changed.

### Extern
Extern allows to interface with code from the "outside" - other libraries, frameworks, ...
In extern blocks every data type has to be explicitely defined, no type inference is performed.
You can define the following different types of data in an extern statement:
 - function: Normal functions that are callable by awesome
 - interface: Interfaces that may be used by awesome, if you want to create an interface create a function

```
extern
  function array_length_int(array is array of int) returns int alias arr_len
  
  function print(output are int, string, float) returns void -- Multiple return types may be allowed, not sure if this will be implemented 
  
  function create_MyOtherObject() returns MyOtherObject alias crt_obj
  
  interface MyOtherObject alias myObject
    function attr1() returns void
    function attr2() returns void
    function attr3() returns void
  end
end
```

### Extension Methods
This system is used to provide some convenience methods for existing classes or primitive datatypes

```
class int is extension
  function toFloat()
    var floatVal = this
    return floatVal
  end
  function toInt()
    return this
  end
  function toString()
    return int_to_string_func(this) -- native function call
  end
end

class array of int is extension
  property this[position]
    get
      return access_intarray(this, position) -- native function call
    end
    set
      set_intarray(this, position, value) -- native function call
    end
  end
  function toFloatArray()
    -- convert to float array
  end
  function toStringArray()
    -- convert to string array
  end
  function iterate()
    for i in range(this.length)
      yield this[i]
    end
  end
  function length()
    return array_length(this) -- native function call
  end
end
```
### Modules
To import modules into Awesome one has to defined them in a file '*.awesome' which then can be imported by the 'import' keyword. Imported modules are accessible in the current scope and may be used as if they were defined in the local scope. If you do not want the stuff to be imported directly into the current scope, you can define an alias.

```
file1:
function foo(bar)
  return bar + 10
end

file2:
import file1 alias addBy10Module
import language

function main()
  print addBy10Module.foo(20)
end
```

### Possible Features
#### Likely
 * Indexer
 * Generics
 * Interface
 * Abstract classes/functions
 * Closures
 * Duck Typing in functions => create new functions as soon as it is used with a new datatype
 * Enums
 * Break / Continue in loops
 * Multiple Return
 * Compile Time Null Check

#### Not so likely
 * Async / Await like functions for threading (like C#)
 * Operatoroverloading
 * Static classes
 * Annotations
 * Inmutable Objects / Classes by language
 * Metaprogramming
 * Contracts
 * Nullable / Not Nullable Data Types
 * Dynamic Typing