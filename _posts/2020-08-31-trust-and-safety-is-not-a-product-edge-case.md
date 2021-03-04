---
title: Trust and safety is not a product edge case
description: Online abuse and harassment may appear to be an "edge case", but it's the unfortunate reality of being a social network today
---

Last week, my colleague @katmeister chronicled [her recent experience with online harassment](https://www.tinykat.cafe/on-all-that-fuckery) (content warning: racist, sexist, transphobic, hateful language, and online abuse). Kat's post is well worth reading if you want to better understand how people (most of whom don't look like me) experience the internet daily, but one line in particular stood out to me:

> it's always an "edge case" until someone's personal safety is threatened.

When I joined GitHub's Community and Safety team back in 2016, I distinctly remember a conversation I had with one of the team's then-engineers as I was onboarding. We were discussing a potential user safety feature, and ever the vigilant Product Manager, I crunched the numbers to see how prevalent the problem was. Instances where the feature would likely be useful was in the range of single digits to hundreds of users. On a platform with 30 million developers at the time, if an issue affected less than a thousand users, I'd rarely prioritize it, in favor of the team focusing on more impactful work. I quickly wrote off the problem as an "[edge case](https://en.wikipedia.org/wiki/Edge_case)". I was quickly corrected.

### A prioritization problem

The go-to heuristic in bug triage is to favor high-visibility bugs. For Product Management generally, it's low-lift and high-impact. To this day, I will often still decry a feature [if it serves less than 80% of users](https://ben.balter.com/2016/03/08/optimizing-for-power-users-and-edge-cases/). But abuse vectors are fundamentally different from bugs or feature requests in that "number of people affected" or "how much money they pay us" doesn't properly capture the magnitude and nature of the risk it presents to both your customers and your business (or in the case of Kat, your employees). Unlike a bug that breaks an experience or a feature that enables new ones, a single exploitation of a single abuse vector can have profound real-world affects on its target.

At best, abuse and harassment is disruptive and diminishes the user experience, which is why it might be tempting to treat abuse like you would a bug, technical debt, or a feature request. But when you start talking about [doxing](https://en.wikipedia.org/wiki/Doxing), stalking, and [swatting](https://en.wikipedia.org/wiki/Swatting), it quickly goes from affecting mental health and wellbeing to threatening physical safety. I, for one, wouldn't want a platform I build to be used as a vehicle to harm others, even in a single instance, but it goes beyond "doing the right thing". In the near term, users who have (or observe others having) bad experiences stop using your product,[^1] and in the long term, as an unattended community turns toxic, [it directly affects](https://www.businessinsider.com/disney-ceo-bob-iger-abandons-twitter-deal-over-abuse-problem-2019-9) the [business's value](https://nymag.com/intelligencer/2018/04/dan-mccomas-reddit-product-svp-and-imzy-founder-interview.html) in the form of reputational harm.

As I've transitioned from trust and safety towards product security, I'm starting to see just how differently we treat product security from user safety. If you knew of a security vulnerability in your product, you wouldn't deprioritize it because it had only been exploited "a few" times. Ideally, you'd remediate it before it's used even once, and in the event you weren't able to do so, almost without question, it becomes a p0 priority as soon as you discover the first instance of it's exploitation. Why would we protect our users' data with better care than we'd seek to protect our users themselves?

### Beyond blocking

Many platforms do implement [basic trust and safety features like blocking or reporting](/2020/08/31/trust-and-safety-before-someone-gets-hurt/), but trust and safety is much, much more than adding a blocking function to your product and moving on to the next revenue-generating feature.[^2] The reality is that trust and safety is a highly specialized, adversarial space, and it requires a baseline of ongoing investment to stay one step ahead of those who wish to use your platform to do harm to others - automated flagging, sentiment analysis, [sockpuppet](https://en.wikipedia.org/wiki/Sockpuppet_(Internet)) corelation, [brigade](https://www.merriam-webster.com/words-at-play/brigading-online-poll-meaning) prevention, anomaly detection, moderator tools, reputation scores, identity verification, minimizing in-product bias, detailed platform policy and playbooks - the list goes on. 

And that's *only* looking at targeted harassment, without addressing broader trust and safety concerns like privacy, spam, inauthentic behavior, faking signals of trust, intentionally misleading content, impersonation, phishing, illegal content,[^3] malware, financial fraud, resource abuse, moderator safety, or account security among other potential ongoing (and emerging) threats to your users, your community, and ultimately your business, each with their own nuanced considerations and countermeasures.

### The hidden internet tax

It's uncomfortable to acknowledge the darker corners of the internet, especially when most social networks' business models are built on the internet's ability to connect like-minded strangers and paying this necessary internet tax might risk short-term revenue goals. We don't like to admit it out loud, but just as the internet is often an amazing place in connecting the best parts of humanity, the internet is sometimes a terrible place in also bringing out the worst of it. It's truly tempting to forgo abuse and harassment as a "tomorrow" problem (or a "we're different"[^4] problem), especially in a growing startup or a highly competitive industry, but more-often-than-not, "tomorrow" arrives once it's too late and you find yourself in the midst of urgent damage control. The challenge is in taking trust and safety seriously when it's still a hypothetical risk, and not after someone has been hurt and it's a painfully known problem. Without action on your part now, and an ongoing commitment to back up that investment, your product can (and given a non-zero number of people on the internet with malicious intent, most likely will) be unknowingly exploited to cause irreparable harm to your users and your community, and ultimately, erode trust in and the value of your platform. 

It doesn't have to be that way. Prioritizing trust and safety efforts today will prevent the darker corners of the internet from coming to light on your platform tomorrow. What may appear to be an "edge case" on the surface, is in fact the unfortunate reality of being an online service provider, one that's increasingly at the front of our ongoing conversation as to the role social networks play in our modern society. While Kat's experience is undeniably terrible, if this can happen to someone who spends their day building welcoming communities (and on a platform that had invested in trust and safety for some time before it happened), imagine what harm you might cause to your users, your community, and your business, if you don't take trust and safety seriously [before someone (like Kat) gets hurt](/2020/08/31/trust-and-safety-before-someone-gets-hurt/).

[^1]: A [study by the Anti-Defamation League](https://www.wired.com/story/severe-online-harassment-2018-adl-survey/) found that 1 in 3 Americans, and half of those 18–29 years old experience severe online harassment. 38% withdrew from the platform after the experience. GitHub's [open source survey](https://github.com/github/open-source-survey), found that 20% of users who experienced *or witnessed* negative interactions stopped contributing as a result.

[^2]: I'd actually argue that when you look at the competitive advantage healthy, vibrant, and welcoming communities offer platforms (see, e.g., the ongoing TikTok acquisition), trust and safety *is* a revenue generating exercise, although hard to quantify, as it affects growth metrics indirectly, and is most visible when absent.

[^3]: E.g., child sexual abuse material (CSAM) or terrorist and violent extremist content (TVEC).

[^4]: All platforms eventually become vehicles for abuse. Even ARPANET, the precursor to the internet [had spam](https://en.wikipedia.org/wiki/History_of_email_spam#The_%22first_spam_email%22_in_1978). If you don't think your platform has abuse today, chances are it does, and you don't know it yet.