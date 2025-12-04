---
inclusion: always
---

# AgentOS Project Guidelines

## Code Style and Standards

### React Components
- Use functional components with hooks
- Keep components under 300 lines
- Extract reusable logic into custom hooks
- Use meaningful component and variable names

### File Organization
```
src/
├── components/     # Reusable UI components
├── pages/         # Page-level components
├── config/        # Configuration files
└── assets/        # Static assets
```

### Naming Conventions
- Components: PascalCase (e.g., `AIChat.jsx`)
- Files: PascalCase for components, kebab-case for utilities
- CSS: kebab-case (e.g., `ai-chat.css`)
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE

## Design System

### Colors
- Primary: `#2563eb` (Blue)
- Background: `#000000` (Black)
- Cards: `#0a0a0a` (Dark Gray)
- Borders: `#1a1a1a`, `#2a2a2a`
- Text: `#e7e9ea` (Light Gray)
- Muted: `#8b98a5` (Medium Gray)
- Success: `#00ba7c` (Green)
- Warning: `#ffb800` (Yellow)
- Danger: `#f91880` (Pink)

### Typography
- Font Family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'
- Base Size: 14-16px
- Headings: Bold, clear hierarchy
- Line Height: 1.6

### Spacing
- Base unit: 4px
- Small: 8px
- Medium: 16px
- Large: 24px
- XLarge: 32px

## Component Patterns

### State Management
- Use `useState` for local state
- Use `useEffect` for side effects
- Use `useContext` for global state (if needed)
- Keep state as close to where it's used as possible

### Error Handling
```javascript
try {
  // API call or operation
} catch (error) {
  console.error('Error:', error)
  // Show user-friendly error message
}
```

### Loading States
Always show loading indicators for async operations:
```javascript
const [loading, setLoading] = useState(false)

// In JSX
{loading ? <LoadingSpinner /> : <Content />}
```

## API Integration

### Firebase
- Use centralized config in `src/config/firebase.js`
- Handle authentication errors gracefully
- Store user data in Firestore

### Gemini AI
- API key in environment variables
- Implement retry logic for failed requests
- Show detailed error messages for debugging

## Performance

### Optimization Techniques
- Lazy load routes with React.lazy()
- Memoize expensive calculations with useMemo()
- Debounce user inputs
- Optimize images (WebP, lazy loading)

### Bundle Size
- Keep dependencies minimal
- Use tree-shaking
- Code split by route

## Accessibility

### Requirements
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Color contrast ratios (WCAG AA)
- Focus indicators visible

## Testing Strategy

### Manual Testing
- Test all user flows
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile responsiveness
- Error scenarios

### Future: Automated Testing
- Unit tests for utilities
- Integration tests for components
- E2E tests for critical flows

## Git Workflow

### Commit Messages
Format: `type: description`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, styling
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

Example: `feat: add AI chat assistant with Gemini integration`

### Branch Strategy
- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: New features
- `fix/*`: Bug fixes

## Documentation

### Code Comments
- Explain "why", not "what"
- Document complex logic
- Add JSDoc for functions

### README Updates
- Keep installation steps current
- Document new features
- Update screenshots

## Security

### Best Practices
- Never commit API keys
- Use environment variables
- Validate user inputs
- Sanitize data before display
- Keep dependencies updated

## Deployment

### Pre-deployment Checklist
- [ ] All tests passing
- [ ] No console errors
- [ ] Environment variables set
- [ ] Build succeeds
- [ ] Performance optimized

### Hosting
- Recommended: Vercel or Netlify
- Alternative: AWS, Docker, GitHub Pages

---

**Remember**: Write code that your future self will thank you for! 🚀
