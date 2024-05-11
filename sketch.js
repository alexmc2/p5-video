let earthPath =
  'https://res.cloudinary.com/drbz4rq7y/video/upload/v1713720968/ocean_1920x1080_xyoioq.mp4';
let starsPath =
  'https://res.cloudinary.com/drbz4rq7y/video/upload/v1713721033/1118735_4k_Numbers_Networking_1920x1080_scs7hg.mp4';
let staticPath =
  'https://res.cloudinary.com/drbz4rq7y/video/upload/v1713720666/Problem_Monitor_1920x1080_lyqvqa.mp4';
let humanPath =
  'https://res.cloudinary.com/drbz4rq7y/video/upload/v1713720681/Think_Shiny_1920x1080_qrfzjn.mp4';

let earthVideo, starsVideo, staticVideo, humanVideo;
let videos;
let outsideVideos;

let margin = 20;
let numOfScreensTall = 4;
let numOfScreensWide = 4;

let counter = 1;
let videosStarted = false; // Add this variable to track video playback state

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Load videos
  earthVideo = createVideo(earthPath);
  starsVideo = createVideo(starsPath);
  staticVideo = createVideo(staticPath);
  humanVideo = createVideo(humanPath);

  // Populate videos array
  videos = [earthVideo, starsVideo, staticVideo];

  // Iterate over videos to loop, mute, and hide each one
  for (let i = 0; i < videos.length; i++) {
    let video = videos[i];
    video.loop();
    video.hide();
  }

  humanVideo.loop();
  humanVideo.hide();

  // Populate outsideVideos array
  outsideVideos = [];
  for (let i = 0; i < numOfScreensTall; i++) {
    outsideVideos.push([]);
    for (let j = 0; j < numOfScreensWide; j++) {
      if (
        (i === 1 && j === 1) ||
        (i === 1 && j === 2) ||
        (i === 2 && j === 1) ||
        (i === 2 && j === 2)
      ) {
        outsideVideos[i].push(null); 
      } else {
        let randomIndex = floor(random(videos.length));
        outsideVideos[i].push(videos[randomIndex]);
      }
    }
  }
}

function draw() {
  background(0);

  // Calculate the width and height for each "screen" in the grid
  let w = (width - margin * (numOfScreensWide + 1)) / numOfScreensWide;
  let h = (height - margin * (numOfScreensTall + 1)) / numOfScreensTall;

  // Create a 4x4 grid of screens with a margin of 20px
  for (let i = 0; i < numOfScreensTall; i++) {
    for (let j = 0; j < numOfScreensWide; j++) {
      // Calculate current x, y position where this "screen" should be drawn
      let x = margin + j * (w + margin);
      let y = margin + i * (h + margin);

      // Draw a white rectangle to demonstrate where this "screen" is
      fill(255);
      noStroke();
      rect(x, y, w, h);

      if (!videosStarted && (i === 1 || i === 2) && (j === 1 || j === 2)) {
        // Display "click me" text in the inner grid positions if videos haven't started
        textAlign(CENTER, CENTER);
        textSize(24);
        fill(0);
        text('click me', x + w / 2, y + h / 2);
      } else {
        // Fill this "screen" with a video, according to its (i,j) position
        if (i === 1 && j === 1) {
          // For the top-left inner grid screen, display the top-left quarter of the humanPath video
          image(
            humanVideo.get(0, 0, humanVideo.width / 2, humanVideo.height / 2),
            x,
            y,
            w,
            h
          );
        } else if (i === 1 && j === 2) {
          // For the top-right inner grid screen, display the top-right quarter of the humanPath video
          image(
            humanVideo.get(
              humanVideo.width / 2,
              0,
              humanVideo.width / 2,
              humanVideo.height / 2
            ),
            x,
            y,
            w,
            h
          );
        } else if (i === 2 && j === 1) {
          // For the bottom-left inner grid screen, display the bottom-left quarter of the humanPath video
          image(
            humanVideo.get(
              0,
              humanVideo.height / 2,
              humanVideo.width / 2,
              humanVideo.height / 2
            ),
            x,
            y,
            w,
            h
          );
        } else if (i === 2 && j === 2) {
          // For the bottom-right inner grid screen, display the bottom-right quarter of the humanPath video
          image(
            humanVideo.get(
              humanVideo.width / 2,
              humanVideo.height / 2,
              humanVideo.width / 2,
              humanVideo.height / 2
            ),
            x,
            y,
            w,
            h
          );
        } else {
          let video = outsideVideos[i][j];
          image(video, x, y, w, h);
        }
      }
    }
  }
}

function mousePressed() {
  videosStarted = true; // Set videosStarted to true when mouse is pressed
  for (let i = 0; i < videos.length; i++) {
    videos[i].play();
  }
  humanVideo.play();
  // Make videos on the outside change when mouse is clicked
  for (let i = 0; i < numOfScreensTall; i++) {
    for (let j = 0; j < numOfScreensWide; j++) {
      if (
        i === 0 ||
        j === 0 ||
        i === numOfScreensTall - 1 ||
        j === numOfScreensWide - 1
      ) {
        let randomIndex = floor(random(videos.length));
        outsideVideos[i][j] = videos[randomIndex];
      }
    }
  }
}

// let earthPath =
//   'https://res.cloudinary.com/drbz4rq7y/video/upload/v1713720968/ocean_1920x1080_xyoioq.mp4';
// let starsPath =
//   'https://res.cloudinary.com/drbz4rq7y/video/upload/v1713721033/1118735_4k_Numbers_Networking_1920x1080_scs7hg.mp4';
// let staticPath =
//   'https://res.cloudinary.com/drbz4rq7y/video/upload/v1713720666/Problem_Monitor_1920x1080_lyqvqa.mp4';
// let humanPath =
//   'https://res.cloudinary.com/drbz4rq7y/video/upload/v1713720681/Think_Shiny_1920x1080_qrfzjn.mp4';

// let earthVideo, starsVideo, staticVideo, humanVideo;
// let videos;
// let outsideVideos;

// let margin = 20;
// let numOfScreensTall = 4;
// let numOfScreensWide = 4;

// let counter = 1;

// function setup() {
//   createCanvas(windowWidth, windowHeight);

//   // Load videos
//   earthVideo = createVideo(earthPath);
//   starsVideo = createVideo(starsPath);
//   staticVideo = createVideo(staticPath);
//   humanVideo = createVideo(humanPath);

//   // Populate videos array
//   videos = [earthVideo, starsVideo, staticVideo];

//   // Iterate over videos to loop, mute, and hide each one
//   for (let i = 0; i < videos.length; i++) {
//     let video = videos[i];
//     video.loop();
//     video.volume(0);
//     video.hide();
//   }

//   humanVideo.loop();
//   humanVideo.volume(0);
//   humanVideo.hide();

//   // Populate outsideVideos array
//   outsideVideos = [];
//   for (let i = 0; i < numOfScreensTall; i++) {
//     outsideVideos.push([]);
//     for (let j = 0; j < numOfScreensWide; j++) {
//       if (
//         (i === 1 && j === 1) ||
//         (i === 1 && j === 2) ||
//         (i === 2 && j === 1) ||
//         (i === 2 && j === 2)
//       ) {
//         outsideVideos[i].push(null); // Don't assign a video to the inner grid screens
//       } else {
//         let randomIndex = floor(random(videos.length));
//         outsideVideos[i].push(videos[randomIndex]);
//       }
//     }
//   }

//   // Randomly change videos at outer grid coordinates
//   setTimeout(changeVideos, random(5000, 20000));
// }

// function draw() {
//   background(0);

//   // Calculate the width and height for each "screen" in the grid
//   let w = (width - margin * (numOfScreensWide + 1)) / numOfScreensWide;
//   let h = (height - margin * (numOfScreensTall + 1)) / numOfScreensTall;

//   // Create a 4x4 grid of screens with a margin of 20px
//   for (let i = 0; i < numOfScreensTall; i++) {
//     for (let j = 0; j < numOfScreensWide; j++) {
//       // Calculate current x, y position where this "screen" should be drawn
//       let x = margin + j * (w + margin);
//       let y = margin + i * (h + margin);

//       // Draw a white rectangle to demonstrate where this "screen" is
//       fill(255);
//       noStroke();
//       rect(x, y, w, h);

//       // Fill this "screen" with a video, according to its (i,j) position
//       if (i === 1 && j === 1) {
//         // For the top-left inner grid screen, display the top-left quarter of the humanPath video
//         image(
//           humanVideo.get(0, 0, humanVideo.width / 2, humanVideo.height / 2),
//           x,
//           y,
//           w,
//           h
//         );
//       } else if (i === 1 && j === 2) {
//         // For the top-right inner grid screen, display the top-right quarter of the humanPath video
//         image(
//           humanVideo.get(
//             humanVideo.width / 2,
//             0,
//             humanVideo.width / 2,
//             humanVideo.height / 2
//           ),
//           x,
//           y,
//           w,
//           h
//         );
//       } else if (i === 2 && j === 1) {
//         // For the bottom-left inner grid screen, display the bottom-left quarter of the humanPath video
//         image(
//           humanVideo.get(
//             0,
//             humanVideo.height / 2,
//             humanVideo.width / 2,
//             humanVideo.height / 2
//           ),
//           x,
//           y,
//           w,
//           h
//         );
//       } else if (i === 2 && j === 2) {
//         // For the bottom-right inner grid screen, display the bottom-right quarter of the humanPath video
//         image(
//           humanVideo.get(
//             humanVideo.width / 2,
//             humanVideo.height / 2,
//             humanVideo.width / 2,
//             humanVideo.height / 2
//           ),
//           x,
//           y,
//           w,
//           h
//         );
//       } else {
//         let video = outsideVideos[i][j];
//         image(video, x, y, w, h);
//       }
//     }
//   }
// }

// function changeVideos() {
//   // Randomly change videos at outer grid coordinates
//   for (let i = 0; i < numOfScreensTall; i++) {
//     for (let j = 0; j < numOfScreensWide; j++) {
//       if (
//         i === 0 ||
//         j === 0 ||
//         i === numOfScreensTall - 1 ||
//         j === numOfScreensWide - 1
//       ) {
//         let randomIndex = floor(random(videos.length));
//         outsideVideos[i][j] = videos[randomIndex];
//       }
//     }
//   }

//   // Call changeVideos again after a random interval
//   setTimeout(changeVideos, random(5000, 20000));
// }
