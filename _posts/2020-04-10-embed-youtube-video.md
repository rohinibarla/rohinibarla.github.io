---
layout: post
title: "Embed YouTube video"
date: 2020-04-08 18:20
comments: false
categories:
draft: false
---

When you want to embed the YouTube video on your website, the YouTube website provides a snippet for you to copy and paste on your website. So felt as if it was linking to some page on YouTube. It’s not only just the video, but it also contains the controls to pause, play, scrub, speed, resolution, CC and other things.

But just realized that YouTube website is also a combination of HTML, CSS, JS and resources like video, image and other media types. So when we look into the source and select the video frame in the browser, we see the source like src=“blob: YouTube link”. In a way, all it is pointing to video resources from a YouTube web server. It might be a streaming service.

So either YouTube website streams from this server or our website refers to the same web service and streams the video. Analyzing the YouTube website source and other such websites sources will reveal a lot of interesting things. When you click on the share button, what happens in the code? What gets triggered?
