# 📚 Class Components vs Functional Components - Examples from My Project

## 📋 Important Note: Modern React vs Legacy React

**My project uses 100% modern functional components with hooks.** However, for interview preparation, I'm showing how my functional components would look as class components to demonstrate both paradigms.

---

## 🔥 Class Components: The Legacy Approach

### **Key Points:**
- **Not deprecated** but **not recommended** for new projects
- **Still found** in legacy codebases
- **Built-in state** and lifecycle methods
- **More verbose** than functional components
- **Replaced by hooks** in modern React

---

## 💡 Converting My Functional Components to Class Components

### **Example 1: Theme Toggle - State Management in Classes**

#### **My Current Functional Component:**
**File:** `src/components/theme-toggle.tsx` (Actual implementation)

```typescript
'use client';

import { useState, useEffect } from 'react';
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  };
  
  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-md bg-background text-foreground hover:text-blue-500"
    >
      {isDark ? 
        <MdOutlineLightMode size={20} data-testid="light-icon" /> : 
        <MdDarkMode size={20} data-testid="dark-icon" />
      }
    </button>
  );
}
```

#### **Class Component Version:**

```typescript
'use client';

import React, { Component } from 'react';
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

interface ThemeToggleState {
  isDark: boolean;
}

class ThemeToggle extends Component<{}, ThemeToggleState> {
  // Class component state definition
  state: ThemeToggleState = {
    isDark: false
  };

  // Lifecycle method - equivalent to useEffect with empty dependency array
  componentDidMount() {
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.setState({ isDark: true });
      document.documentElement.classList.add('dark');
    }
  }

  // Class method - bound to this
  toggleTheme = () => {
    this.setState(
      (prevState) => ({ isDark: !prevState.isDark }),
      () => {
        // Callback after setState completes
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', this.state.isDark ? 'dark' : 'light');
      }
    );
  };

  // Required render method
  render() {
    return (
      <button 
        onClick={this.toggleTheme}
        className="p-2 rounded-md bg-background text-foreground hover:text-blue-500"
      >
        {this.state.isDark ? 
          <MdOutlineLightMode size={20} data-testid="light-icon" /> : 
          <MdDarkMode size={20} data-testid="dark-icon" />
        }
      </button>
    );
  }
}

export default ThemeToggle;
```

#### **Key Differences:**

| Functional Component | Class Component |
|---------------------|------------------|
| `const [isDark, setIsDark] = useState(false)` | `state = { isDark: false }` |
| `setIsDark(!isDark)` | `this.setState({ isDark: !this.state.isDark })` |
| `useEffect(() => {}, [])` | `componentDidMount()` |
| Direct return | `render() { return ... }` |
| `isDark` | `this.state.isDark` |

---

### **Example 2: Card Component - Props and Conditional Rendering**

#### **My Current Functional Component:**
**File:** `src/components/ui/Card/index.tsx` (Actual implementation)

```typescript
import CardImage from './card-image';
import CardHeader from './card-header';
import CardBody from './card-body';

interface CardProps {
  title: string;
  description: string;
  imageSrc: string;
  buttonText: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  isHighlighted?: boolean;
  'data-testid'?: string;
}

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
      style={isHighlighted ? { 
        boxShadow: '0 0 0 4px #2563eb' 
      } : {}}
    >
      <div className="rounded-md overflow-hidden shadow-theme min-h-[320px] w-full flex flex-col">
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

#### **Class Component Version:**

```typescript
import React, { Component } from 'react';
import CardImage from './card-image';
import CardHeader from './card-header';
import CardBody from './card-body';

interface CardProps {
  title: string;
  description: string;
  imageSrc: string;
  buttonText: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  isHighlighted?: boolean;
  'data-testid'?: string;
}

class Card extends Component<CardProps> {
  // Default props (optional)
  static defaultProps: Partial<CardProps> = {
    isHighlighted: false
  };

  render() {
    const {
      title,
      description,
      imageSrc,
      buttonText,
      buttonHref,
      onButtonClick,
      isHighlighted,
      'data-testid': testId
    } = this.props;  // ← Accessing props via this.props

    return (
      <div 
        data-testid={testId}
        className={`
          ${isHighlighted ? 'ring-4 ring-blue-600' : ''}
          rounded-md transition-all duration-300
        `}
        style={isHighlighted ? { 
          boxShadow: '0 0 0 4px #2563eb' 
        } : {}}
      >
        <div className="rounded-md overflow-hidden shadow-theme min-h-[320px] w-full flex flex-col">
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
}

export default Card;
```

#### **Props Access Pattern:**

| Functional Component | Class Component |
|---------------------|------------------|
| `function Card({ title, isHighlighted })` | `class Card extends Component<CardProps>` |
| Direct destructuring | `const { title, isHighlighted } = this.props` |
| `title` | `this.props.title` |
| `isHighlighted` | `this.props.isHighlighted` |

---

### **Example 3: Card Grid - Complex State and Lifecycle**

#### **My Current Functional Component:**
**File:** `src/components/card-grid.tsx` (Actual implementation)

```typescript
'use client';

import { useState, useEffect } from 'react';
import Card from './ui/Card';

interface CardData {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  buttonText: string;
  buttonHref?: string;
}

interface CardGridProps {
  cards: CardData[];
}

export default function CardGrid({ cards }: CardGridProps) {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  // Set middle card as active on initial load
  useEffect(() => {
    if (cards.length > 0) {
      const middleIndex = Math.floor((cards.length - 1) / 2);
      const middleCardId = cards[middleIndex].id;
      setActiveCardId(middleCardId);
    }
  }, [cards]);

  const handleButtonClick = (cardId: number) => {
    setActiveCardId(cardId);
  };

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

#### **Class Component Version:**

```typescript
'use client';

import React, { Component } from 'react';
import Card from './ui/Card';

interface CardData {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  buttonText: string;
  buttonHref?: string;
}

interface CardGridProps {
  cards: CardData[];
}

interface CardGridState {
  activeCardId: number | null;
}

class CardGrid extends Component<CardGridProps, CardGridState> {
  // State initialization
  state: CardGridState = {
    activeCardId: null
  };

  // Lifecycle method - component mounted
  componentDidMount() {
    this.setMiddleCardActive();
  }

  // Lifecycle method - props changed
  componentDidUpdate(prevProps: CardGridProps) {
    // Only update if cards prop changed
    if (prevProps.cards !== this.props.cards) {
      this.setMiddleCardActive();
    }
  }

  // Helper method
  setMiddleCardActive = () => {
    if (this.props.cards.length > 0) {
      const middleIndex = Math.floor((this.props.cards.length - 1) / 2);
      const middleCardId = this.props.cards[middleIndex].id;
      this.setState({ activeCardId: middleCardId });
    }
  };

  // Event handler
  handleButtonClick = (cardId: number) => {
    this.setState({ activeCardId: cardId });
  };

  render() {
    const { cards } = this.props;
    const { activeCardId } = this.state;

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
            >
              <Card
                {...card}
                isHighlighted={card.id === activeCardId}
                onButtonClick={() => this.handleButtonClick(card.id)}
                data-testid="card"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CardGrid;
```

#### **Lifecycle Methods vs Hooks:**

| Functional Component (Hooks) | Class Component (Lifecycle) |
|------------------------------|------------------------------|
| `useEffect(() => {}, [])` | `componentDidMount()` |
| `useEffect(() => {}, [cards])` | `componentDidUpdate(prevProps)` |
| `useEffect(() => { return cleanup }, [])` | `componentWillUnmount()` |
| `useState(null)` | `state = { activeCardId: null }` |
| `setActiveCardId(id)` | `this.setState({ activeCardId: id })` |

---

### **Example 4: HomePage with Data Fetching**

#### **My Current Functional Component:**
**File:** `src/app/page.tsx` (Simplified version)

```typescript
'use client';

import { useEffect, useState } from 'react';
import CardGrid from '@/components/card-grid';
import Loading from './loading';
import { getCards, Card } from '@/services/cardService';

export default function HomePage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const cardData = await getCards();
        setCards(cardData);
      } catch (error) {
        console.error('Failed to fetch cards:', error);
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <CardGrid cards={cards} />
    </main>
  );
}
```

#### **Class Component Version:**

```typescript
'use client';

import React, { Component } from 'react';
import CardGrid from '@/components/card-grid';
import Loading from './loading';
import { getCards, Card } from '@/services/cardService';

interface HomePageState {
  cards: Card[];
  loading: boolean;
  error: string | null;
}

class HomePage extends Component<{}, HomePageState> {
  // State initialization
  state: HomePageState = {
    cards: [],
    loading: true,
    error: null
  };

  // Data fetching on mount
  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const cardData = await getCards();
      this.setState({ 
        cards: cardData,
        loading: false 
      });
    } catch (error) {
      console.error('Failed to fetch cards:', error);
      this.setState({ 
        cards: [],
        loading: false,
        error: 'Failed to load cards'
      });
    }
  }

  // Cleanup (if needed)
  componentWillUnmount() {
    // Cancel any ongoing requests
    console.log('HomePage component unmounting');
  }

  render() {
    const { cards, loading, error } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <main>
        <CardGrid cards={cards} />
      </main>
    );
  }
}

export default HomePage;
```

---

## 🔄 Complete Class Component Lifecycle

### **Lifecycle Methods Available:**

```typescript
class MyComponent extends Component<Props, State> {
  // 1. Constructor (optional)
  constructor(props: Props) {
    super(props);
    this.state = { /* initial state */ };
  }

  // 2. Component mounting
  componentDidMount() {
    // After component is mounted to DOM
    // Good for: API calls, subscriptions, timers
  }

  // 3. Component updating
  componentDidUpdate(prevProps: Props, prevState: State) {
    // After component re-renders
    // Good for: responding to prop changes
  }

  // 4. Component unmounting
  componentWillUnmount() {
    // Before component is removed from DOM
    // Good for: cleanup, unsubscribe, clear timers
  }

  // 5. Error handling
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // When child components throw errors
    console.error('Component error:', error);
  }

  // 6. Render method (required)
  render() {
    return <div>Component content</div>;
  }
}
```

---

## 📊 Comparison Table: Class vs Functional Components

| Feature | Class Components | Functional Components |
|---------|------------------|----------------------|
| **Syntax** | `class MyComponent extends Component` | `function MyComponent()` |
| **State** | `this.state = {}` + `this.setState()` | `useState()` hook |
| **Lifecycle** | Built-in lifecycle methods | `useEffect()` hook |
| **Props** | `this.props.propName` | Function parameters |
| **Methods** | Class methods | Functions inside component |
| **Context** | `this.context` | `useContext()` hook |
| **Performance** | PureComponent optimization | `React.memo()` + `useMemo()` |
| **Learning Curve** | Steeper (OOP concepts) | Easier (functional programming) |
| **Code Length** | More verbose | More concise |
| **Modern Usage** | Legacy/maintenance | Recommended |

---

## 🎯 Interview Talking Points

### **Question: "How do you create a class component?"**

**Answer:** *"While my current project uses only functional components, I can show you how my components would look as classes. To create a class component, you use the `class` keyword and extend from `React.Component`. For example, my theme toggle would become `class ThemeToggle extends Component`. You need a `render()` method that returns JSX, and you access props via `this.props` instead of function parameters."*

### **Question: "How do you manage state in class components?"**

**Answer:** *"In class components, you define state as a class property: `state = { isDark: false }` and update it with `this.setState({ isDark: true })`. Unlike functional components where I use `useState`, class components have built-in state management. You can see in my theme toggle example how `this.setState()` updates the state and triggers a re-render."*

### **Question: "What are lifecycle methods in class components?"**

**Answer:** *"Class components have built-in lifecycle methods like `componentDidMount()` for initial setup, `componentDidUpdate()` for responding to changes, and `componentWillUnmount()` for cleanup. In my card grid example, I'd use `componentDidMount()` to set the initial middle card highlight, whereas in my functional version I use `useEffect(() => {}, [])` to achieve the same result."*

### **Question: "Why are functional components preferred over class components?"**

**Answer:** *"Functional components with hooks are more concise, easier to test, and offer better performance optimization. My entire project uses functional components because they're the modern React standard. However, understanding class components is important for maintaining legacy codebases and understanding React's evolution."*

---

## 🚀 Key Takeaways

### **Class Components (Legacy):**
- ✅ Built-in state and lifecycle methods
- ✅ Still supported by React
- ❌ More verbose and complex
- ❌ Harder to optimize and test
- ❌ Not recommended for new projects

### **Functional Components (Modern):**
- ✅ Cleaner, more concise syntax
- ✅ Hooks provide same functionality
- ✅ Better performance optimization
- ✅ Easier to test and debug
- ✅ Recommended approach (used in my project)

**My project demonstrates modern React best practices with functional components, but understanding both paradigms is crucial for React developers!** 🎨