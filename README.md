# URL shortener to voice for Clubhouse - [shorten.club](https://shorten.club)

Yes, yes, yes, and yes, I know it doesn't convert links into the voice.

***[shorten.club](https://shorten.club)*** converts links or note buckets into a readable 6-digit number, but why?


## Background - What is Clubhouse?

> In short: Clubhouse is an audio-based social media app. The company describes itself as "a new type of social product based on a voice that allows people everywhere to talk, tell stories, develop ideas, deepen friendships, and meet interesting new people around the world."
> Basically, you can jump in and out of different chats, on different subjects, in something akin to a live, free-flowing podcast. You can simply listen or choose to throw in your thoughts. Imagine a cocktail party or, clubhouse.

*Description is taken from [Mashable](https://mashable.com/article/what-is-clubhouse-app/)*

## What can't we do in Clubhouse?

Now, you all know what you can do with Clubhouse, it's time to focus on what can't you do in Clubhouse. Clubhouse is a great platform to discuss ideas, contact your friends, organize brainstorming sessions or ask questions to known-people, yet it is very limited on other things such as resource sharing such as links, notes, buckets of ideas, movies, songs, etc.

## Why can't I use other URL shorteners?

Whether you are on desktop or mobile, URL shorteners works pretty well, but when it comes to sharing the shortened URL by voice/by spelling it, it can easily become a nightmare. Since Clubhouse is a voice-driven platform, you would want your shortened URL to be pronounced easily which is not possible with a mix of uppercase/lowercase letters and digits. On top of it, Clubhouse is an international platform, there are people from everywhere which means different languages and accents, etc. Even if people speak the same language, it is hard to spell a shortened URL one by one.

## How did you solve it?

As you may know every bank on the planet sends 6-8 digit numbers as SMS when it needs your authentication or 2FA works the same way, or quiz platform Kahoot.it gives 8-digit numbers to join a session. These all inspired us to make a URL shortener that converts buckets/lists into 6-digit numbers. In that way, you can easily gather the PIN and access the resources with it.

Currently, you can create buckets of links or notes. You can add, update, and delete those resources even after you share them with your audience.

## Examples

- Upcoming Events: [WIP]
- A bucket of movies to watch: [https://shorten.club/665292](https://shorten.club/665292)
- A bucket of resources for Saas Startups: [https://shorten.club/191626](https://shorten.club/191626)

## Installation

Installation is as simple as it gets.

1) Clone the project to your computer:
   
```
git clone https://github.com/omergulen/shorten-club-frontend.git
```

2) Install dependencies:
```
yarn
```
or
```
npm install
```
3) Run the project on localhost:
```
yarn develop
```
or 
```
npm run develop
```

That's it!

   * Installation note for Apple Silicon M1 users
     > One of the project's current dependencies that get installed is `sharp`. Currently, sharp Prebuilt libvips 8.10.5 binaries are not yet available for darwin-arm64v8. [See here.](https://sharp.pixelplumbing.com/install#apple-m1) \
     > The work around proposed is to first install it with brew:
      ```
      brew install vips
      ```
     > Then you can proceed to finish the installation of all dependencies using the 2nd step.
  


## Contribution

General open source contribution rules apply. Any contributions you make are greatly appreciated.

1) Fork the Project
2) Create your Feature Branch (`git checkout -b feature/x`)
3) Commit your Changes (`git commit -m 'Add some feature'`)
4) Push to the Branch (`git push origin feature/x`)
5) Open a Pull Request
