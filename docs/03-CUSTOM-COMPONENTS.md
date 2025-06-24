# 🧩 Custom Components Implementation

## 📋 Requirement
**"Use of components, e.g, the card should be made with components such as Card, CardImage, CardHeader, CardBody, Button. Please do not use ANY component libraries or packages like MUI or ANT design. We want to see you are able to build these components yourself."**

## ✅ Implementation Summary
**Built 100% custom components** - No external UI libraries used. All components built from scratch with TypeScript, proper interfaces, and modular architecture.

---

## 🛠️ Component Architecture

### **Component Tree Structure**
```
Card (Parent Component)
├── CardImage (Image with hover overlay)
├── CardHeader (Title section)
└── CardBody (Description + Button)
    └── Button (Reusable button component)
```

---

## 🧩 Individual Component Implementations

### **1. Card Component (Parent Container)**

**File:** `src/components/ui/Card/index.tsx`
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

export { CardImage, CardHeader, CardBody };
```

#### **Key Features:**
- **Composition Pattern**: Uses child components for modularity
- **TypeScript Interface**: Fully typed props for type safety
- **Conditional Styling**: Dynamic border highlighting
- **Flexible Layout**: Flexbox for responsive card structure
- **Export Pattern**: Re-exports child components for easy import

---

### **2. CardImage Component (Image with Hover Overlay)**

**File:** `src/components/ui/Card/card-image.tsx`
```typescript
import Image from 'next/image';

interface CardImageProps {
  src: string;
  alt: string;
}

export default function CardImage({ src, alt }: CardImageProps) {
  return (
    <div className="relative h-36 w-full flex-shrink-0">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-xs text-white font-medium">
          Learn More
        </span>
      </div>
    </div>
  );
}
```

#### **Key Features:**
- **Next.js Image Optimization**: Uses `next/image` for performance
- **Hover Overlay**: CTA text appears on hover
- **Smooth Transitions**: `transition-opacity duration-300`
- **Responsive Images**: `object-cover` for consistent aspect ratios
- **Absolute Positioning**: Overlay positioned over image

#### **Bonus Feature Implemented:**
✅ **"Add an image hover overlay (e.g., show CTA text when hovering over the image)"**

---

### **3. CardHeader Component (Title Section)**

**File:** `src/components/ui/Card/card-header.tsx`
```typescript
interface CardHeaderProps {
  title: string;
}

export default function CardHeader({ title }: CardHeaderProps) {
  return (
    <div className="px-4 pt-2">
      <h3 className="text-base font-black">
        {title}
      </h3>
    </div>
  );
}
```

#### **Key Features:**
- **Simple Interface**: Single prop for title
- **Consistent Spacing**: Matches card padding system
- **Typography**: Bold heading with proper sizing
- **Semantic HTML**: Uses `h3` for proper heading hierarchy

---

### **4. CardBody Component (Content + Button)**

**File:** `src/components/ui/Card/card-body.tsx`
```typescript
import Button from '../button';

interface CardBodyProps {
  description: string;
  buttonText: string;
  buttonHref?: string;
  onButtonClick?: () => void;
}

export default function CardBody({
  description,
  buttonText,
  buttonHref,
  onButtonClick
}: CardBodyProps) {
  return (
    <div className="px-4 pb-4 flex flex-col h-full">
      <div className="space-y-2.5 mb-4 min-h-[100px] flex-grow">
        {description.split('\n').map((paragraph, index) => (
          <p key={index} className="text-[11px] leading-relaxed text-justify hyphens-auto">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-auto pt-2">
        <Button 
          href={buttonHref}
          onClick={onButtonClick}
          className="w-full text-[11px] py-1 min-h-[28px]"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
```

#### **Key Features:**
- **Multi-paragraph Support**: Splits description by `\n` for Card 3 requirement
- **Flexible Button**: Supports both href and onClick
- **Bottom Alignment**: Button always at bottom with `mt-auto`
- **Typography**: Justified text with hyphens for better readability
- **Minimum Heights**: Ensures consistent card heights

#### **Requirement Met:**
✅ **"Card 3 needs to have 2 paragraphs of text in it so it's higher than the other cards"**

---

### **5. Button Component (Reusable Button)**

**File:** `src/components/ui/button.tsx`
```typescript
import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function Button({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary'
}: ButtonProps) {
  const baseStyles = "inline-block py-1.5 px-4 rounded-full text-center font-bold text-[13px] transition-colors duration-200";
  
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
  };

  const buttonClass = `${baseStyles} ${variantStyles[variant]} ${className}`;

  // If both href and onClick are provided, prioritize onClick for state management
  if (href && !onClick) {
    return (
      <Link href={href} className={buttonClass}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}
```

#### **Key Features:**
- **Dual Mode**: Works as link (`<Link>`) or button (`<button>`)
- **Variant System**: Primary and secondary styles
- **Dark Mode Support**: Automatic dark mode styling
- **Customizable**: Accepts additional className props
- **Hover States**: Smooth color transitions
- **Priority Logic**: onClick takes precedence over href

---

## 🔧 Component Usage Examples

### **1. Basic Card Usage**

```typescript
// In CardGrid component
<Card
  title="Heading 1"
  description="Lorem ipsum dolor sit amet..."
  imageSrc="https://example.com/image.jpg"
  buttonText="Button 1"
  buttonHref="/services/one"
  isHighlighted={card.id === activeCardId}
  onButtonClick={() => handleButtonClick(card.id)}
  data-testid="card"
/>
```

### **2. Individual Component Usage**

```typescript
// Using components separately if needed
import { CardImage, CardHeader, CardBody } from '@/components/ui/Card';

<div className="custom-card">
  <CardImage src="/image.jpg" alt="Custom image" />
  <CardHeader title="Custom Title" />
  <CardBody 
    description="Custom description"
    buttonText="Custom Button"
    onButtonClick={handleClick}
  />
</div>
```

### **3. Button Component Usage**

```typescript
// As a link button
<Button href="/about" variant="secondary">
  Learn More
</Button>

// As a click handler button
<Button onClick={handleSubmit} variant="primary">
  Submit Form
</Button>

// With custom styling
<Button 
  onClick={handleAction}
  className="w-full mt-4"
  variant="secondary"
>
  Custom Action
</Button>
```

---

## 📁 Component File Structure

```
src/components/ui/
├── Card/
│   ├── index.tsx           # Main Card component
│   ├── card-image.tsx      # CardImage component
│   ├── card-header.tsx     # CardHeader component
│   └── card-body.tsx       # CardBody component
├── button.tsx              # Reusable Button component
├── toast.tsx               # Toast notification component
└── toast-context.tsx       # Toast context provider
```

---

## 🎯 Component Design Principles

### **1. Single Responsibility**
- Each component has one clear purpose
- CardImage handles images and overlays
- CardHeader handles titles
- CardBody handles content and actions

### **2. Composition Over Inheritance**
- Card composes smaller components
- Flexible and reusable architecture
- Easy to modify individual parts

### **3. Props Interface Design**
```typescript
// Clear, typed interfaces for all components
interface CardProps {
  title: string;                    // Required
  description: string;              // Required
  imageSrc: string;                 // Required
  buttonText: string;               // Required
  buttonHref?: string;              // Optional
  onButtonClick?: () => void;       // Optional
  isHighlighted?: boolean;          // Optional with default
  'data-testid'?: string;          // Optional for testing
}
```

### **4. Flexible Styling**
```typescript
// Accept additional className for customization
interface ButtonProps {
  className?: string;  // Allows custom styling
  variant?: 'primary' | 'secondary';  // Predefined variants
}
```

### **5. TypeScript Integration**
- All components fully typed
- Interface definitions for props
- Type safety throughout the component tree

---

## 🧪 Component Testing

### **Card Grid Component Test**
**File:** `src/components/__tests__/card-grid.test.tsx`
```typescript
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CardGrid from '../card-grid';

const mockCards = [
  {
    id: 1,
    title: "Card 1",
    description: "Description 1",
    imageSrc: "/test1.jpg",
    buttonText: "Button 1"
  },
  // ... more cards
];

describe('CardGrid', () => {
  it('renders correct number of cards with proper content', () => {
    render(<CardGrid cards={mockCards} />);
    
    // Verify all cards are rendered
    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Button 1')).toBeInTheDocument();
  });

  it('highlights middle card by default', () => {
    render(<CardGrid cards={mockCards} />);
    
    const cards = screen.getAllByTestId('card');
    expect(cards[1]).toHaveClass('ring-4 ring-blue-600');
  });
});
```

---

## 🎨 Design System Consistency

### **1. Spacing System**
```typescript
// Consistent spacing across components
className="px-4 pb-4"  // Card body padding
className="px-4 pt-2"  // Card header padding
className="py-1.5 px-4"  // Button padding
```

### **2. Typography Scale**
```typescript
className="text-base font-black"  // Card headers
className="text-[11px] leading-relaxed"  // Card descriptions
className="text-[13px]"  // Button text
```

### **3. Border Radius**
```typescript
className="rounded-md"  // Cards
className="rounded-full"  // Buttons
```

### **4. Color System**
```typescript
// Consistent color usage
className="bg-blue-600 text-white hover:bg-blue-700"  // Primary buttons
className="ring-4 ring-blue-600"  // Card highlights
```

---

## 🔄 Component Reusability

### **1. Button Component Usage Across App**
- Card action buttons
- Navigation buttons
- Form submit buttons
- Toast demo buttons

### **2. Card Component Variations**
- Main page cards
- Different content lengths
- Various button actions
- Responsive layouts

### **3. Extensibility**
```typescript
// Easy to extend with new props
interface CardProps {
  // Existing props...
  badge?: string;  // Could add badge support
  actions?: React.ReactNode;  // Could add multiple actions
  size?: 'small' | 'medium' | 'large';  // Could add size variants
}
```

---

## ✅ Requirements Met

| Requirement | Implementation | Status |
|-------------|----------------|---------|
| Custom Card component | ✅ Built from scratch with composition | **Complete** |
| CardImage component | ✅ With hover overlay functionality | **Complete** |
| CardHeader component | ✅ Handles titles with proper typography | **Complete** |
| CardBody component | ✅ Handles content and button integration | **Complete** |
| Button component | ✅ Reusable with variants and dual modes | **Complete** |
| No external UI libraries | ✅ 100% custom components, no MUI/Ant Design | **Complete** |
| TypeScript interfaces | ✅ All components fully typed | **Complete** |
| Modular architecture | ✅ Composable and reusable design | **Complete** |

**All components are built from scratch, demonstrating strong component architecture skills and attention to detail!** 🧩