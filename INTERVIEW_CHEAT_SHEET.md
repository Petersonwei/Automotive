# 🚀 Interview Cheat Sheet - Dealer Studio Technical Assessment

## 📋 Project Overview
**Next.js 15 Automotive Landing Page** with React 19, TypeScript, and TailwindCSS
- **Framework**: Next.js 15 with App Router
- **UI**: React 19 + TypeScript + TailwindCSS 4
- **Testing**: Jest + React Testing Library
- **State**: React hooks + Context API
- **API**: Axios with error handling

---

## 🎯 Core Features Implementation

### 1. **Card Border Highlighting System** 
*Location: `src/components/card-grid.tsx`*

#### **The Logic**
```typescript
// State management for active card
const [activeCardId, setActiveCardId] = useState<number | null>(null);

// Calculate middle card on component mount
useEffect(() => {
  if (cards.length > 0) {
    const middleIndex = Math.floor((cards.length - 1) / 2);
    const middleCardId = cards[middleIndex].id;
    setActiveCardId(middleCardId);
  }
}, [cards]);

// Handle button clicks to switch active card
const handleButtonClick = (cardId: number) => {
  setActiveCardId(cardId);
};
```

#### **How It Works**
1. **Initial State**: `activeCardId` starts as `null`
2. **Middle Card Calculation**: `Math.floor((cards.length - 1) / 2)` finds middle index
   - For 3 cards: `Math.floor((3-1)/2) = 1` → middle card (index 1)
   - For 5 cards: `Math.floor((5-1)/2) = 2` → middle card (index 2)
3. **State Update**: Sets middle card's ID as active
4. **Click Handler**: Updates `activeCardId` when any card button is clicked
5. **Visual Feedback**: Card component receives `isHighlighted` prop

#### **Component Interaction**
```typescript
// CardGrid passes highlight state to each Card
<Card
  {...card}
  isHighlighted={card.id === activeCardId}  // Boolean prop
  onButtonClick={() => handleButtonClick(card.id)}  // Click handler
/>
```

---

### 2. **Card Component Architecture**
*Location: `src/components/ui/Card/index.tsx`*

#### **Component Structure**
```typescript
interface CardProps {
  title: string;
  description: string;
  imageSrc: string;
  buttonText: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  isHighlighted?: boolean;  // Controls border styling
  'data-testid'?: string;
}
```

#### **Highlight Implementation**
```typescript
// Dynamic styling based on isHighlighted prop
<div 
  className={`
    ${isHighlighted ? 'ring-4 ring-blue-600' : ''}
    rounded-md transition-all duration-300
  `}
  style={isHighlighted ? { 
    boxShadow: '0 0 0 4px #2563eb' 
  } : {}}
>
```

#### **How Components Interact**
1. **CardGrid** → **Card**: Passes data and highlight state
2. **Card** → **CardImage**: Passes image source and alt text
3. **Card** → **CardHeader**: Passes title
4. **Card** → **CardBody**: Passes description, button text, and click handler
5. **CardBody** → **Button**: Handles click events

---

### 3. **API Integration & Data Flow**
*Location: `src/services/cardService.ts`*

#### **Service Setup**
```typescript
// Axios configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

#### **Error Handling Logic**
```typescript
export async function getCards(): Promise<Card[]> {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Random failure simulation (10% chance in development)
    if (process.env.NODE_ENV === 'development' && Math.random() < 0.1) {
      throw new Error('Random network failure simulation');
    }
    
    return cardData.cards;
  } catch (error) {
    console.error('Card service error:', error);
    
    // Specific error handling
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout - please check your internet connection');
      }
      if (error.response?.status === 404) {
        throw new Error('Service not found - please try again later');
      }
      if (error.response?.status >= 500) {
        throw new Error('Server error - please try again later');
      }
    }
    
    throw new Error(`Failed to load services: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
```

#### **Data Flow in Main Page**
*Location: `src/app/page.tsx`*

```typescript
export default function HomePage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const cardData = await getCards();  // API call
        setCards(cardData);  // Update state
      } catch (error) {
        console.error('Failed to fetch cards:', error);
        showToast('Failed to load content. Please refresh the page to try again.', 'error');
        setCards([]);  // Fallback to empty array
      } finally {
        setLoading(false);  // Hide loading state
      }
    };

    fetchCards();
  }, [showToast]);

  // Conditional rendering based on loading state
  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      {cards.length > 0 ? (
        <CardGrid cards={cards} />
      ) : (
        <div className="text-center">
          <h2>Services Currently Unavailable</h2>
          <p>We're having trouble loading our services. Please try refreshing the page.</p>
        </div>
      )}
    </main>
  );
}
```

---

### 4. **Dark/Light Mode Toggle System**
*Location: `src/components/theme-toggle.tsx`*

#### **State Management**
```typescript
const [isDark, setIsDark] = useState(false);
```

#### **Initial Theme Detection**
```typescript
useEffect(() => {
  // Check localStorage first, then system preference
  if (localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setIsDark(true);
    document.documentElement.classList.add('dark');
  }
}, []);
```

#### **Toggle Logic**
```typescript
const toggleTheme = () => {
  setIsDark(!isDark);  // Update React state
  document.documentElement.classList.toggle('dark');  // Toggle CSS class
  localStorage.setItem('theme', isDark ? 'light' : 'dark');  // Persist preference
};
```

#### **TailwindCSS Integration**
*Location: `tailwind.config.ts`*

```typescript
const config: Config = {
  darkMode: 'class',  // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',  // CSS custom properties
        foreground: 'var(--foreground)',
      },
    },
  },
};
```

#### **How It Works**
1. **Initial Load**: Checks localStorage → system preference → defaults to light
2. **Toggle Action**: Updates React state → toggles DOM class → saves to localStorage
3. **CSS Variables**: TailwindCSS uses CSS custom properties that change based on `.dark` class
4. **Persistence**: User preference saved in localStorage for future visits

---

### 5. **Toast Notification System**
*Location: `src/components/ui/toast-context.tsx`*

#### **Context Setup**
```typescript
interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);
```

#### **Provider Implementation**
```typescript
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    setToast({ message, type });
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </ToastContext.Provider>
  );
}
```

#### **Usage in Components**
```typescript
// In any component that needs to show toasts
const { showToast } = useToast();

// Show error toast
showToast('Failed to load content. Please refresh the page to try again.', 'error');
```

---

### 6. **Responsive Design Implementation**

#### **Grid System**
*Location: `src/components/card-grid.tsx`*

```typescript
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-8">
  {cards.map((card, index) => (
    <div 
      className={`w-full max-w-[280px] sm:max-w-[320px] lg:max-w-none mx-auto ${
        cards.length % 2 !== 0 && index === cards.length - 1 
          ? 'sm:col-span-2 lg:col-span-1 sm:justify-self-center'
          : ''
      }`}
    >
```

#### **Breakpoint Strategy**
- **Mobile (default)**: 1 column, max-width 280px, centered
- **Tablet (sm)**: 2 columns, max-width 320px, larger gaps
- **Desktop (lg)**: 3 columns, no max-width constraint
- **Odd Cards**: Last card spans 2 columns on tablet, centers on desktop

---

### 7. **Testing Strategy**
*Location: `src/components/__tests__/card-grid.test.tsx`*

#### **Border Logic Tests**
```typescript
it('highlights middle card by default', () => {
  render(<CardGrid cards={mockCards} />);
  
  const cards = screen.getAllByTestId('card');
  
  // Middle card should have highlight class
  expect(cards[1]).toHaveClass('ring-4 ring-blue-600');
  // Other cards should not have highlight
  expect(cards[0]).not.toHaveClass('ring-4 ring-blue-600');
  expect(cards[2]).not.toHaveClass('ring-4 ring-blue-600');
});

it('changes highlight when clicking card buttons', () => {
  render(<CardGrid cards={mockCards} />);
  
  const buttons = screen.getAllByRole('button');
  const cards = screen.getAllByTestId('card');
  
  // Click first card's button
  fireEvent.click(buttons[0]);
  expect(cards[0]).toHaveClass('ring-4 ring-blue-600');
  expect(cards[1]).not.toHaveClass('ring-4 ring-blue-600');
});
```

#### **Theme Toggle Tests**
```typescript
it('toggles between light and dark mode when clicked', () => {
  render(<ThemeToggle />);
  
  const toggleButton = screen.getByRole('button');
  
  // Initially should show dark mode icon
  expect(toggleButton.firstChild).toHaveAttribute('data-testid', 'dark-icon');
  
  // Click the button
  fireEvent.click(toggleButton);
  
  // Should now show light mode icon
  expect(toggleButton.firstChild).toHaveAttribute('data-testid', 'light-icon');
  
  // Should have added 'dark' class to document
  expect(document.documentElement.classList.contains('dark')).toBe(true);
});
```

---

## 🧠 React: Virtual DOM vs. Shadow DOM (Using Your Code Examples)

### **What makes React so powerful?**
React's power stems from its use of the **Virtual DOM** - demonstrated throughout your project.

### **Virtual DOM in Your Project**

#### **1. State Changes Trigger Virtual DOM Diffing**
*Your Theme Toggle (`src/components/theme-toggle.tsx:17-21`)*

```typescript
const toggleTheme = () => {
  setIsDark(!isDark);  // ← State change triggers Virtual DOM update
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
};

return (
  <button onClick={toggleTheme}>
    {isDark ? 
      <MdOutlineLightMode size={20} data-testid="light-icon" /> : 
      <MdDarkMode size={20} data-testid="dark-icon" />
    }
  </button>
);
```

**Virtual DOM Process:**
1. **Before**: Virtual DOM has `<MdDarkMode />` 
2. **State Change**: `setIsDark(!isDark)` updates React state
3. **Virtual DOM Update**: React creates new Virtual DOM with `<MdOutlineLightMode />`
4. **Diffing**: React compares old vs new Virtual DOM trees
5. **Reconciliation**: Only the icon component is updated in real DOM

#### **2. Efficient Re-rendering with Card Highlighting**
*Your Card Grid (`src/components/card-grid.tsx:31-55`)*

```typescript
const [activeCardId, setActiveCardId] = useState<number | null>(null);

const handleButtonClick = (cardId: number) => {
  setActiveCardId(cardId);  // ← State change
};

return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {cards.map((card) => (
      <Card
        key={card.id}
        {...card}
        isHighlighted={card.id === activeCardId}  // ← Derived state
        onButtonClick={() => handleButtonClick(card.id)}
      />
    ))}
  </div>
);
```

**Virtual DOM Efficiency:**
- **Problem**: Without Virtual DOM, clicking a button might re-render all 3 cards
- **Virtual DOM Solution**: React compares Virtual DOM trees and only updates:
  - The previously highlighted card (removes highlight)  
  - The newly clicked card (adds highlight)
- **Result**: 2 DOM updates instead of 3 complete re-renders

#### **3. Conditional Rendering Optimization**
*Your Card Component (`src/components/ui/Card/index.tsx:27-36`)*

```typescript
<div 
  className={`
    ${isHighlighted ? 'ring-4 ring-blue-600' : ''}  // ← Conditional class
    rounded-md transition-all duration-300
  `}
  style={isHighlighted ? { 
    boxShadow: '0 0 0 4px #2563eb' 
  } : {}}  // ← Conditional style
>
```

**Virtual DOM Process:**
1. **First Render**: Virtual DOM stores `className=""` and `style={}`
2. **Highlight Change**: New Virtual DOM has `className="ring-4 ring-blue-600"` and shadow style
3. **Diffing**: React identifies only `className` and `style` attributes changed
4. **Update**: Only these attributes are modified in real DOM (no element recreation)

#### **4. Loading State Management**
*Your Main Page (`src/app/page.tsx:175-192`)*

```typescript
const [loading, setLoading] = useState(true);
const [cards, setCards] = useState<Card[]>([]);

// Conditional rendering based on state
if (loading) {
  return <Loading />;  // ← Completely different component tree
}

return (
  <main>
    {cards.length > 0 ? (
      <CardGrid cards={cards} />  // ← Another conditional branch
    ) : (
      <div className="text-center">  // ← Fallback UI
        <h2>Services Currently Unavailable</h2>
      </div>
    )}
  </main>
);
```

**Virtual DOM Tree Switching:**
- **Loading State**: Virtual DOM contains `<Loading />` component
- **Data Loaded**: Virtual DOM switches to `<CardGrid />` or error message
- **Efficiency**: React unmounts old tree, mounts new tree efficiently
- **No Manual DOM Manipulation**: You write declarative code, React handles DOM changes

#### **5. Toast Portal System**
*Your Toast (`src/components/ui/toast.tsx`)*

```typescript
return createPortal(
  <div className="fixed top-4 right-4 z-50">
    <div className={`flex items-center p-4 ${typeStyles[type]}`}>
      {icons[type]}
      <div className="ml-3 text-sm">{message}</div>
      <button onClick={onClose}>×</button>
    </div>
  </div>,
  document.body  // ← Renders outside normal tree
);
```

**Virtual DOM + Portals:**
- **Normal Flow**: Virtual DOM manages component tree hierarchy
- **Portal**: Creates Virtual DOM element but renders to different DOM location
- **Still Managed**: Even though rendered to `document.body`, React's Virtual DOM still manages updates
- **Event Bubbling**: Events still bubble through Virtual DOM tree, not DOM tree

### **Virtual DOM vs Shadow DOM - The Key Difference**

#### **Virtual DOM (What Your Project Uses)**
```typescript
// Your theme toggle demonstrates Virtual DOM
const [isDark, setIsDark] = useState(false);

// Virtual DOM: React's internal optimization
// When isDark changes:
// 1. React updates Virtual DOM representation
// 2. Compares with previous Virtual DOM
// 3. Updates only changed parts in real DOM
```

**Purpose**: Internal React optimization for efficient DOM updates
**Your Code**: Every state change in your project uses Virtual DOM diffing

#### **Shadow DOM (NOT Used in Your Project)**
```javascript
// Shadow DOM example (NOT in your code)
class MyCustomElement extends HTMLElement {
  constructor() {
    super();
    // Creates encapsulated DOM tree
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        /* Styles isolated from main document */
        p { color: red; }
      </style>
      <p>This is in Shadow DOM</p>
    `;
  }
}
```

**Purpose**: Web Components encapsulation (styles/scripts isolated)
**React Relationship**: None - React doesn't use Shadow DOM internally

### **Interview Explanation Using Your Code**

**"How does Virtual DOM work in your project?"**

*"Great question! Let me show you with my card highlighting system. When a user clicks a card button, my `handleButtonClick` function updates the `activeCardId` state. React then creates a new Virtual DOM tree where only the `isHighlighted` prop changes for affected cards. React's diffing algorithm compares the old and new Virtual DOM trees, identifies that only two cards need updates - removing the highlight from the previous card and adding it to the clicked card. This means React only touches those specific DOM elements instead of re-rendering the entire grid, making the interaction super smooth and efficient."*

**"What's the difference between Virtual DOM and Shadow DOM?"**

*"Virtual DOM is React's internal optimization mechanism that I use throughout my project - every time I update state like `setActiveCardId` or `setIsDark`, React uses Virtual DOM diffing to efficiently update the real DOM. Shadow DOM, on the other hand, is a web standard for creating encapsulated DOM trees, which I don't use in this project at all. They're completely different concepts - Virtual DOM is about performance optimization, while Shadow DOM is about component encapsulation."*

---

## 🔄 Component Interaction Flow

### **Complete Data Flow**
1. **App Start**: `layout.tsx` wraps app with `ToastProvider`
2. **Page Load**: `page.tsx` calls `getCards()` API service
3. **Loading State**: Shows `Loading` component while fetching
4. **Data Received**: Updates `cards` state, passes to `CardGrid`
5. **Card Rendering**: `CardGrid` calculates middle card, renders `Card` components
6. **User Interaction**: Click card button → `handleButtonClick` → state update → re-render with new highlight
7. **Error Handling**: API failure → `showToast` → error message displayed
8. **Theme Toggle**: Click theme button → toggle state → update DOM class → save to localStorage

### **State Management Architecture**
- **Local State**: `useState` for component-specific data (cards, loading, activeCardId, isDark)
- **Context State**: `useContext` for global features (toast notifications)
- **Persistent State**: `localStorage` for user preferences (theme)
- **Derived State**: Calculated values (middle card index, highlight status)

---

## 🎯 Key Interview Talking Points

### **Technical Decisions**
1. **"Why did you use Math.floor for middle card calculation?"**
   - Handles both odd and even array lengths consistently
   - Mathematical approach is more reliable than hardcoding

2. **"How did you handle the responsive design?"**
   - Mobile-first approach with progressive enhancement
   - Flexible grid system that adapts to different screen sizes
   - Special handling for odd numbers of cards

3. **"Explain your error handling strategy"**
   - Multiple layers: network errors, HTTP status codes, user-friendly messages
   - Graceful degradation with fallback UI
   - Toast notifications for user feedback

4. **"Why did you choose this component architecture?"**
   - Separation of concerns: each component has a single responsibility
   - Reusability: components can be used in different contexts
   - Maintainability: easy to update individual parts

### **Code Quality Highlights**
- **TypeScript**: Full type safety with interfaces
- **Testing**: Unit tests for critical business logic
- **Error Boundaries**: Proper error handling throughout
- **Accessibility**: Semantic HTML and proper ARIA labels
- **Performance**: Optimized re-renders with proper dependency arrays

---

## 🚀 Demo Script

**"Let me walk you through the key features:"**

1. **"The cards load with the middle one highlighted by default"** → Show initial state
2. **"When I click any card button, the border smoothly transitions"** → Click different cards
3. **"The layout is fully responsive"** → Resize browser window
4. **"Error handling works gracefully"** → Show toast demo
5. **"Dark mode toggle persists user preference"** → Toggle theme
6. **"Everything is thoroughly tested"** → Show test results

**Key phrase**: *"I focused on creating a robust, user-friendly experience with proper error handling and smooth interactions."*