# 🎯 Why `className` Instead of `class` in JSX - Examples from My Project

## 📋 The Core Question

**"Why can't we use `class` inside JSX markup and why do we use `className` instead?"**

This is a fundamental JSX concept that every React developer must understand.

---

## 🔥 The Main Reason: JavaScript Reserved Keywords

### **The Problem:**

In JavaScript, `class` is a **reserved keyword** used for creating ES6 classes:

```javascript
// This is valid JavaScript - class keyword for creating classes
class Car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
  
  start() {
    console.log(`${this.make} ${this.model} is starting...`);
  }
}

const myCar = new Car('Toyota', 'Camry');
```

### **The Collision:**

If JSX allowed `class` attribute, we'd have a conflict:

```jsx
// ❌ This would create confusion - which "class" means what?
class MyComponent {  // ← ES6 class keyword
  render() {
    return (
      <div class="app">  // ← HTML class attribute (INVALID in JSX)
        Content here
      </div>
    );
  }
}
```

### **The Solution:**

JSX uses `className` to avoid this collision:

```jsx
// ✅ This is clear and unambiguous
class MyComponent {  // ← ES6 class keyword
  render() {
    return (
      <div className="app">  // ← JSX className attribute
        Content here
      </div>
    );
  }
}
```

---

## 💡 Real Examples from My Project

### **Example 1: Basic className Usage**

**File:** `src/components/theme-toggle.tsx`

```typescript
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  };
  
  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-md bg-background text-foreground hover:text-blue-500"
      //    ↑ className, not class
    >
      {isDark ? 
        <MdOutlineLightMode size={20} data-testid="light-icon" /> : 
        <MdDarkMode size={20} data-testid="dark-icon" />
      }
    </button>
  );
}
```

#### **What Would Happen with `class`:**

```typescript
// ❌ This would cause a TypeScript/React error
<button 
  onClick={toggleTheme}
  class="p-2 rounded-md bg-background text-foreground hover:text-blue-500"
  //  ↑ Error: Property 'class' does not exist on type 'DetailedHTMLProps<...>'
>
```

**Editor Error Message:**
```
Property 'class' does not exist on type 'DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>'. Did you mean 'className'?
```

---

### **Example 2: Dynamic className with JavaScript Expressions**

**File:** `src/components/top-nav.tsx`

```typescript
export default function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-[var(--background)] border-b border-[var(--border)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                href="/"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/') 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-[var(--text-primary)] hover:text-blue-500 hover:border-gray-300'
                }`}
                //    ↑ Dynamic className with JavaScript template literal
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

#### **Why This Works with className but Not class:**

1. **JavaScript Expression**: The `${}` template literal is JavaScript code
2. **Dynamic Evaluation**: The classes change based on `isActive('/')` function result
3. **Reserved Word Conflict**: `class` would conflict with JavaScript's class keyword

---

### **Example 3: Complex className Composition**

**File:** `src/components/ui/button.tsx`

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;  // ← Notice className as a prop type
  href?: string;
  onClick?: () => void;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '',  // ← className parameter
  href, 
  onClick 
}: ButtonProps) {
  const baseStyles = "inline-block py-1.5 px-4 rounded-full text-center font-bold text-[13px] transition-colors duration-200";
  
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
  };

  // JavaScript logic to combine classes
  const buttonClass = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href && !onClick) {
    return (
      <Link href={href} className={buttonClass}>
        //                      ↑ className, not class
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      //            ↑ className, not class
      {children}
    </button>
  );
}
```

#### **TypeScript Interface Shows the Difference:**

```typescript
interface ButtonProps {
  className?: string;  // ✅ Correct - className property
  // class?: string;   // ❌ Would be invalid - class is reserved
}
```

---

### **Example 4: Conditional className Logic**

**File:** `src/components/ui/Card/index.tsx`

```typescript
export default function Card({
  title,
  description,
  imageSrc,
  buttonText,
  buttonHref,
  onButtonClick,
  isHighlighted = false,
  'data-testid': testId
}: CardProps) {
  return (
    <div 
      data-testid={testId}
      className={`
        ${isHighlighted ? 'ring-4 ring-blue-600' : ''}
        rounded-md transition-all duration-300
      `}
      //    ↑ Multi-line template literal with conditional logic
      style={isHighlighted ? { 
        boxShadow: '0 0 0 4px #2563eb' 
      } : {}}
    >
      <div className="rounded-md overflow-hidden shadow-theme min-h-[320px] w-full flex flex-col">
        //       ↑ className on nested elements
        <CardImage 
          src={imageSrc}
          alt={title}
        />
        <div className="flex flex-col flex-grow">
          <CardHeader title={title} />
          <CardBody
            description={description}
            buttonText={buttonText}
            buttonHref={buttonHref}
            onButtonClick={onButtonClick}
          />
        </div>
      </div>
    </div>
  );
}
```

#### **Complex JavaScript Logic in className:**

```typescript
// This is JavaScript code inside JSX
className={`
  ${isHighlighted ? 'ring-4 ring-blue-600' : ''}  // ← Ternary operator
  rounded-md transition-all duration-300
`}
```

**This wouldn't work with HTML's `class` attribute because:**
- HTML attributes can't execute JavaScript
- Template literals are JavaScript features
- Conditional logic requires JavaScript evaluation

---

### **Example 5: Grid Layout with Mathematical className Logic**

**File:** `src/components/card-grid.tsx`

```typescript
export default function CardGrid({ cards }: CardGridProps) {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-8">
        {cards.map((card, index) => (
          <div 
            key={card.id} 
            className={`w-full max-w-[280px] sm:max-w-[320px] lg:max-w-none mx-auto ${
              cards.length % 2 !== 0 && index === cards.length - 1 
                ? 'sm:col-span-2 lg:col-span-1 sm:justify-self-center'
                : ''
            }`}
            //    ↑ Mathematical calculation affecting CSS classes
          >
            <Card
              {...card}
              isHighlighted={card.id === activeCardId}
              onButtonClick={() => handleButtonClick(card.id)}
              data-testid="card"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### **Mathematical Logic in className:**

```typescript
// JavaScript mathematical operation determining CSS classes
cards.length % 2 !== 0 && index === cards.length - 1 
  ? 'sm:col-span-2 lg:col-span-1 sm:justify-self-center'  // Odd number of cards
  : ''  // Even number of cards
```

**This demonstrates:**
- Complex JavaScript logic in className
- Mathematical calculations (`%` modulo operator)
- Conditional class application based on array length and index

---

## 🔄 HTML vs JSX Comparison

### **In HTML (Static):**

```html
<!-- HTML - Static class attribute -->
<div class="container">
  <button class="btn btn-primary">Click me</button>
</div>
```

### **In JSX (Dynamic):**

```typescript
// JSX - Dynamic className with JavaScript
function MyComponent({ isActive, variant, customClass }) {
  return (
    <div className="container">
      <button 
        className={`btn btn-${variant} ${isActive ? 'active' : ''} ${customClass}`}
        //       ↑ JavaScript template literal with variables
      >
        Click me
      </button>
    </div>
  );
}
```

---

## 🎯 Key Differences Summary

| Aspect | HTML `class` | JSX `className` |
|--------|-------------|-----------------|
| **Type** | Static string | Dynamic JavaScript expression |
| **Syntax** | `class="string"` | `className={expression}` |
| **Logic** | No logic allowed | Full JavaScript logic |
| **Variables** | Cannot use variables | Can embed variables with `{}` |
| **Conditions** | No conditional logic | Ternary operators, logical AND |
| **Functions** | Cannot call functions | Can call functions |
| **Reserved Word** | Not in JavaScript | Avoids `class` keyword conflict |

---

## 🚨 Common Mistakes and Fixes

### **Mistake 1: Using `class` instead of `className`**

```typescript
// ❌ WRONG - Will cause TypeScript/React error
<div class="container">
  Content
</div>

// ✅ CORRECT
<div className="container">
  Content
</div>
```

### **Mistake 2: Forgetting Curly Braces for Dynamic Classes**

```typescript
// ❌ WRONG - Template literal treated as string
<div className="`btn ${variant}`">
  
// ✅ CORRECT - Template literal evaluated as JavaScript
<div className={`btn ${variant}`}>
```

### **Mistake 3: Using String Concatenation Instead of Template Literals**

```typescript
// ❌ WORKS but less readable
<div className={"btn " + variant + " " + (isActive ? "active" : "")}>

// ✅ BETTER - Template literal
<div className={`btn ${variant} ${isActive ? 'active' : ''}`}>
```

---

## 🎯 Interview Talking Points

### **Question: "Why do we use className instead of class in JSX?"**

**Answer:** *"We use `className` instead of `class` in JSX because `class` is a reserved keyword in JavaScript used for creating ES6 classes. If JSX allowed the `class` attribute, it would create a naming collision with JavaScript's class keyword. You can see this throughout my project - in my theme toggle component, I use `className='p-2 rounded-md bg-background'` instead of `class`. This also allows JSX to support dynamic class names using JavaScript expressions, like in my navigation component where I use template literals: `className={\`inline-flex items-center \${isActive('/') ? 'text-blue-600' : 'text-gray-500'}\`}`. This wouldn't be possible with HTML's static `class` attribute."*

### **Question: "Show me an example of dynamic className from your code"**

**Answer:** *"Perfect! Look at my card component where I use conditional className logic: `className={\`\${isHighlighted ? 'ring-4 ring-blue-600' : ''} rounded-md transition-all\`}`. This template literal evaluates the `isHighlighted` boolean and conditionally applies the ring classes. In my card grid, I even use mathematical calculations to determine classes: `cards.length % 2 !== 0 && index === cards.length - 1` to handle odd numbers of cards. These dynamic features are only possible because JSX treats className as a JavaScript expression, not a static HTML attribute."*

### **Question: "What would happen if you used class instead of className?"**

**Answer:** *"If I tried to use `class` instead of `className`, I'd get a TypeScript error: 'Property class does not exist on type DetailedHTMLProps'. The editor would suggest using `className` instead. This is because React's type definitions don't include a `class` prop - they only recognize `className`. Additionally, using `class` would conflict with JavaScript's class keyword used for creating classes, which you can see in ES6 class syntax like `class Car { constructor() {} }`."*

---

## 🚀 Benefits of className Over class

### **1. JavaScript Integration**
```typescript
// Dynamic classes based on component state
className={isActive ? 'bg-blue-500' : 'bg-gray-500'}
```

### **2. Template Literals**
```typescript
// Complex class composition
className={`base-styles ${variant} ${customClass}`}
```

### **3. Function Calls**
```typescript
// Classes determined by function calls
className={getButtonClasses(variant, size, isDisabled)}
```

### **4. Object Mapping**
```typescript
// Classes from object properties
const styles = { primary: 'bg-blue-500', secondary: 'bg-gray-500' };
className={styles[variant]}
```

### **5. Conditional Logic**
```typescript
// Complex conditional class application
className={`
  ${isHighlighted ? 'ring-4 ring-blue-600' : ''}
  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-75'}
  rounded-md transition-all
`}
```

The `className` attribute in JSX provides all the functionality of HTML's `class` attribute while enabling powerful JavaScript-driven dynamic styling! 🎨