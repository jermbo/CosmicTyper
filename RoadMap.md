## Road Map

The future of the project will include the following items.

- Updated Router - DONE
  - Restructure the application to utilize Routify - DONE
  - Add Admin area - DONE
- Admin Area
  - Create Login Screen - DONE
  - Authenticate to Strapi Backend - DONE
  - Review lessons - DONE
  - Edit lesson - DONE
  - Order lessons - DONE
  - Create lessons - DONE
  - Delete lessons - DONE
- User Sessions
  - Unique Id Generator
    - Persist data to the admin
    - Refresh id
- User Settings
  - Basic setting page view
  - See their given id
  - Add setting for dark mode
- Dark Mode feature
  - Need to rework the css and remove Bulma framework - DONE
  - Update various places to be CSS Custom Properties - DONE
  - Connect to settings and persist to database / local storage
- Enhance General Typing - issue #61
  - white background - DONE
  - cursor indicator - DONE
  - individual wrappers around completed characters - DONE
  - ( looking at typing.com for design inspiration ) - DONE
- Enhance Web Lessons
  - cursor indicator - DONE
- Gamification
  - Scoring System
    - Implement countdown timer
    - Implement streak multiplier
    - Display user score on selection screen
  - Display on lesson screens
  - Leader boards



 # User Settings

Structure
```JavaScript

{
  id: 'red-car-777',
  lastUpdated: timestamp,
  webLessons_typingLessons: [ // two separate keys
    {
      lessonId: string,
      completed: boolean,
      bestTime: number,
      longestStreak: number,
      wordsPerMinute: number,
    }
  ],
  preferences: {
    language: enum, // language code
    theme: string, // light or dark
  }
}

```

Features
* Keep track of last used time and consider cleaning up after predefined amount of time
