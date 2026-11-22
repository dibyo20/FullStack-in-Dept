# React Performance Optimization --- Practical Assignment

**Topics:** `useMemo` · `React.memo` · `useCallback`\
**Levels:** 3 · **Questions:** 6 · **Questions per level:** 2

## Assignment objective

The goal is to learn how to identify and fix unnecessary work in React
applications.

Students must demonstrate that they can:

-   Identify unnecessary component re-renders.
-   Avoid repeating expensive calculations when their inputs have not
    changed.
-   Preserve function references when passing callbacks to memoized
    children.
-   Choose the correct optimization technique for a specific performance
    problem.
-   Test and compare an application before and after optimization.

> **Important:** Do not use all three techniques everywhere. Apply an
> optimization only when you can explain the problem it solves.

------------------------------------------------------------------------

# Level 1 --- Basic Optimization

**Focus:** Expensive calculations and unnecessary child renders.

## Q1. Expensive Calculation Optimization

**Primary concept:** `useMemo`

Build a component with two independent states:

``` jsx
const [count, setCount] = useState(0);
const [number, setNumber] = useState(1);
```

### Requirements

1.  Create an expensive calculation based on `number`.
2.  Simulate expensive work using a loop of approximately 50 million
    iterations, or another measurable CPU-intensive calculation.
3.  Display the calculated result.
4.  Add an **Increment Count** button.
5.  Add a **Change Number** button.
6.  The expensive calculation should run again when `number` changes.
7.  Incrementing `count` should not cause the calculation to run again.

### Testing checklist

-   [ ] Increment `count` five times and inspect the console.
-   [ ] Change `number` and verify that the calculation runs again.
-   [ ] Increment `count` again and verify that the calculation does not
    repeat.
-   [ ] Explain why `number` belongs in the dependency array.

### Expected learning

Understand how `useMemo` caches a calculated value and recalculates it
when its dependencies change.

------------------------------------------------------------------------

## Q2. Prevent Unnecessary Child Component Renders

**Primary concept:** `React.memo`

Create these files:

``` text
src/
├── App.jsx
└── components/
    └── UserProfile.jsx
```

### Requirements

1.  In `App`, create two states:
    -   `count`
    -   `username`
2.  Add an **Increment Count** button.
3.  Add an **Update Username** button.
4.  Pass `username` to `UserProfile` as a prop.
5.  Wrap `UserProfile` with `React.memo`.
6.  Add render logs inside both components.

### Testing checklist

-   [ ] Increment `count` five times.
-   [ ] Check whether `UserProfile` renders again.
-   [ ] Change `username`.
-   [ ] Check whether `UserProfile` renders again.
-   [ ] Explain why the child renders in one situation but not the
    other.

### Expected learning

Understand how `React.memo` can skip a child render when its props have
not changed.

------------------------------------------------------------------------

# Level 2 --- Intermediate Optimization

**Focus:** Function references and combining memoization techniques.

## Q3. Function Reference Optimization

**Primary concepts:** `useCallback` + `React.memo`

Build a parent component with:

``` jsx
const [count, setCount] = useState(0);
const [username, setUsername] = useState("Student");
```

Create a child component named `UserActions`.

### Requirements

1.  Pass `username` and an `updateUsername` callback to `UserActions`.
2.  Wrap `UserActions` with `React.memo`.
3.  **First version:** Do not use `useCallback`.
4.  Increment `count` and observe whether the child renders.
5.  **Second version:** Wrap `updateUsername` with `useCallback`.
6.  Repeat the test and compare the results.
7.  Updating the username must continue to work correctly.

### Testing checklist

-   [ ] Test the application without `useCallback`.
-   [ ] Increment `count` five times and record child renders.
-   [ ] Add `useCallback` with the correct dependencies.
-   [ ] Repeat the same test.
-   [ ] Update the username and verify that the child still renders when
    its props change.
-   [ ] Explain why `React.memo` alone did not prevent the child render
    in the first version.

### Expected learning

Understand that a function declared during rendering gets a new
reference on each render. `useCallback` can preserve that reference
between renders when its dependencies have not changed.

------------------------------------------------------------------------

## Q4. Product Filtering and Sorting Optimization

**Primary concepts:** `useMemo` + `React.memo`

Use the following sample data:

``` jsx
const products = [
  { id: 1, name: "Laptop", price: 60000, category: "Electronics" },
  { id: 2, name: "Mobile", price: 20000, category: "Electronics" },
  { id: 3, name: "Shoes", price: 3000, category: "Fashion" },
  { id: 4, name: "Watch", price: 5000, category: "Fashion" },
  { id: 5, name: "Monitor", price: 15000, category: "Electronics" }
];
```

### Requirements

1.  Display all products.
2.  Add a category filter.
3.  Add sorting options:
    -   Price: Low to High
    -   Price: High to Low
4.  Add a counter that is independent of filtering and sorting.
5.  Use `useMemo` for filtering and sorting.
6.  Create a separate `ProductList` component.
7.  Wrap `ProductList` with `React.memo`.
8.  Add console logs to track calculations and component renders.

### Testing checklist

-   [ ] Increment the unrelated counter five times.
-   [ ] Verify that filtering and sorting calculations do not repeat.
-   [ ] Change the category and verify that the filtered result updates.
-   [ ] Change the sorting order and verify that the sorted result
    updates.
-   [ ] Observe when `ProductList` renders.
-   [ ] Explain which dependencies trigger each calculation.

### Expected learning

Understand how to avoid repeating data transformations when their inputs
have not changed.

------------------------------------------------------------------------

# Level 3 --- Advanced Optimization

**Focus:** Component trees, dependency management, real-world
performance testing, and combining all three techniques.

## Q5. Large Student Dashboard Optimization

**Primary concepts:** `useMemo` + `React.memo` + `useCallback`

Build a Student Dashboard containing at least **1,000 student records**.

Each student should have this structure:

``` jsx
{
  id: 1,
  name: "Student 1",
  marks: 85,
  department: "CSE",
  status: "Passed"
}
```

### Requirements

1.  Display a list of students.
2.  Add a search input to search by student name.
3.  Add a department filter.
4.  Add sorting by marks.
5.  Add a button to toggle a student's status.
6.  Add a separate dashboard counter.
7.  Create these components:

``` text
Dashboard
├── DashboardStats
└── StudentList
    └── StudentCard
```

### Optimization requirements

  -----------------------------------------------------------------------
  Technique                           Where to consider using it
  ----------------------------------- -----------------------------------
  `useMemo`                           Search results, filtering, sorting,
                                      dashboard statistics

  `React.memo`                        `StudentCard`, `StudentList`,
                                      `DashboardStats`, where useful

  `useCallback`                       Status-toggle callback passed to
                                      memoized children
  -----------------------------------------------------------------------

### Testing checklist

-   [ ] Type in the search input and monitor component renders.
-   [ ] Change the department filter.
-   [ ] Change sorting order.
-   [ ] Toggle one student's status.
-   [ ] Increment the unrelated dashboard counter.
-   [ ] Check whether unrelated student cards render again.
-   [ ] Compare the application before and after optimization.
-   [ ] Explain the dependencies used by each memoized value and
    callback.

### Expected learning

Optimize a component tree while keeping the application fully
functional.

------------------------------------------------------------------------

## Q6. E-Commerce Product Listing --- Performance Challenge

**Primary concepts:** All three optimization techniques

Build an e-commerce product listing with at least **2,000 products**.

Each product should have this structure:

``` jsx
{
  id: 1,
  name: "Gaming Laptop",
  price: 75000,
  category: "Electronics",
  rating: 4.5,
  stock: 10
}
```

### Requirements

1.  Display products in a grid.
2.  Search products by name.
3.  Filter products by category.
4.  Filter products by price range.
5.  Sort products by price and rating.
6.  Add products to the cart.
7.  Display cart count and total price.
8.  Add a Wishlist button.
9.  Add a separate counter unrelated to the product listing.

### Optimization requirements

  -----------------------------------------------------------------------
  Technique                           Where to consider using it
  ----------------------------------- -----------------------------------
  `useMemo`                           Filtered products, sorted products,
                                      cart total, derived wishlist
                                      information

  `React.memo`                        `ProductCard`, `ProductGrid`,
                                      `CartSummary`, where useful

  `useCallback`                       Add to cart, toggle wishlist,
                                      remove from cart callbacks passed
                                      to memoized children
  -----------------------------------------------------------------------

### Testing checklist

-   [ ] Increment the unrelated counter ten times.
-   [ ] Search for products and observe calculations.
-   [ ] Change category and price range.
-   [ ] Change sorting order.
-   [ ] Add products to the cart.
-   [ ] Toggle wishlist items.
-   [ ] Remove a product from the cart.
-   [ ] Check whether unrelated components render unnecessarily.
-   [ ] Compare optimized and unoptimized versions using React DevTools
    Profiler.
-   [ ] Explain every optimization decision.

### Expected learning

Apply all three techniques in a realistic application and justify why
each one is useful.

------------------------------------------------------------------------

# Submission and Testing Rules

For **every question**, students must follow these steps:

1.  Build the working application **without optimization first**.
2.  Add render logs and calculation logs.
3.  Identify the actual performance issue.
4.  Apply the appropriate optimization technique.
5.  Repeat the same tests.
6.  Compare the results before and after optimization.
7.  Explain why the selected hook or technique solves the identified
    problem.

## Required submission structure

``` text
Question-01/
├── without-optimization/
│   └── src/
├── with-optimization/
│   └── src/
├── screenshots/
│   ├── before.png
│   └── after.png
└── explanation.md
```

The `explanation.md` file must answer:

-   What was the performance issue?
-   Which optimization technique did you use?
-   Why did you choose that technique?
-   What changed after optimization?
-   What did you observe during testing?

------------------------------------------------------------------------

# Evaluation Criteria

  Evaluation criteria                                    Marks
  -------------------------------------------------- ---------
  Correct use of `useMemo`                                  15
  Correct use of `React.memo`                               15
  Correct use of `useCallback`                              15
  Understanding of dependency arrays                        15
  Identifying unnecessary renders                           15
  Testing with console and React DevTools Profiler          15
  Code quality and explanation                              10
  **Total**                                            **100**

------------------------------------------------------------------------

# Important Concepts Students Must Understand

### 1. `useMemo`

**Question:** Why should I cache this calculated value instead of
calculating it again on every render?

Use it when a calculation is expensive and its inputs have not changed.

### 2. `React.memo`

**Question:** Why is this child component rendering when its props have
not changed?

Use it when skipping a child render can provide a meaningful performance
benefit.

### 3. `useCallback`

**Question:** Why is my function reference changing, and is that causing
a memoized child to render again?

Use it when a stable function reference is useful, commonly when passing
callbacks to memoized children or using functions as Hook dependencies.

------------------------------------------------------------------------

# Teacher's Final Performance Checklist

A student should be able to demonstrate all of the following before
completing this assignment:

-   [ ] Can identify an unnecessary component render.
-   [ ] Can identify an expensive calculation.
-   [ ] Understands the difference between `useMemo` and `useCallback`.
-   [ ] Understands what `React.memo` actually prevents.
-   [ ] Understands reference equality for objects and functions.
-   [ ] Can write correct dependency arrays.
-   [ ] Knows when NOT to use these optimization techniques.
-   [ ] Can compare performance before and after optimization.
-   [ ] Can use React DevTools Profiler to investigate rendering
    behavior.
-   [ ] Can explain every optimization decision without blindly applying
    hooks.

## Final Goal

**Do not aim to use more React hooks. Aim to write React applications
that perform less unnecessary work.**

A successful student should be able to look at an existing React
application, identify its performance bottlenecks, select the correct
optimization technique, and prove through testing that the optimization
is useful.