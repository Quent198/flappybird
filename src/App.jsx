import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const canvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const birdImg = new Image();
    birdImg.src = "./assets/sprites/yellowbird-upflap.png";

    const pipeImg = new Image();
    pipeImg.src = "./assets/sprites/pipe-green.png";

    const bgImg = new Image();
    bgImg.src = "./assets/sprites/background-day.png";

    const loadImages = () => {
      let loadedCount = 0;
      const onLoad = () => {
        loadedCount++;
        if (loadedCount === 3) {
          setImagesLoaded(true);
          drawBackground();
        }
      };

      birdImg.onload = onLoad;
      pipeImg.onload = onLoad;
      bgImg.onload = onLoad;
    };

    loadImages();

    const bird = {
      x: 50,
      y: canvas.height / 2,
      width: 34,
      height: 24,
      gravity: 0.8,
      lift: -15,
      velocity: 0,
    };
    let pipes = [];
    let frameCount = 0; // Initial value set to 0 to generate pipes earlier
    let score = 0;
    let bgX = 0;

    const addPipe = () => {
      const pipeHeight =
        Math.floor(Math.random() * (canvas.height / 2)) + canvas.height / 4;
      pipes.push({
        x: canvas.width,
        y: pipeHeight,
        width: 52,
        height: canvas.height,
        gap: 200, // Increased the gap between top and bottom pipes
      });
    };

    const drawBackground = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(bgImg, bgX, 0, canvas.width, canvas.height);
      context.drawImage(
        bgImg,
        bgX + canvas.width,
        0,
        canvas.width,
        canvas.height
      );
    };

    const draw = () => {
      if (!imagesLoaded || !gameStarted) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and scroll the background
      context.drawImage(bgImg, bgX, 0, canvas.width, canvas.height);
      context.drawImage(
        bgImg,
        bgX + canvas.width,
        0,
        canvas.width,
        canvas.height
      );
      bgX -= 2;
      if (bgX <= -canvas.width) bgX = 0;

      // Bird physics
      bird.velocity += bird.gravity;
      bird.y += bird.velocity;
      context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

      // Add pipes
      if (frameCount % 200 === 0) {
        // Decreased the frame interval for new pipes at the start
        addPipe();
      }

      // Draw pipes
      for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= 2;
        if (pipes[i].x + pipes[i].width <= 0) {
          pipes.splice(i, 1);
          score++;
        }

        const topPipeY = pipes[i].y - pipes[i].gap - pipes[i].height;

        // Draw bottom pipe
        context.drawImage(
          pipeImg,
          pipes[i].x,
          pipes[i].y,
          pipes[i].width,
          pipes[i].height
        );
        // Draw top pipe
        context.save();
        context.translate(pipes[i].x, topPipeY);
        context.rotate(Math.PI);
        context.drawImage(
          pipeImg,
          -pipes[i].width,
          -pipes[i].height,
          pipes[i].width,
          pipes[i].height
        );
        context.restore();

        // Check for collision with top pipe
        if (
          bird.x < pipes[i].x + pipes[i].width &&
          bird.x + bird.width > pipes[i].x &&
          bird.y < topPipeY + pipes[i].height
        ) {
          resetGame();
        }

        // Check for collision with bottom pipe
        if (
          bird.x < pipes[i].x + pipes[i].width &&
          bird.x + bird.width > pipes[i].x &&
          bird.y + bird.height > pipes[i].y
        ) {
          resetGame();
        }
      }

      // Check for collision with ground or ceiling
      if (bird.y + bird.height >= canvas.height || bird.y <= 0) {
        resetGame();
      }

      // Draw score
      context.fillStyle = "white";
      context.font = "20px Arial";
      context.fillText(`Score: ${score}`, 10, 25);

      frameCount++;
      requestAnimationFrame(draw);
    };

    const resetGame = () => {
      location.reload();
      bird.x = 50;
      bird.y = canvas.height / 2;
      bird.velocity = 0;
      pipes = [];
      frameCount = 0; // Reset frameCount to 0 to generate pipes earlier
      score = 0;
      bgX = 0;
      addPipe(); // Add an initial pipe immediately after reset
    };

    canvas.addEventListener("click", () => {
      if (gameStarted) {
        bird.velocity = bird.lift;
      }
    });

    draw();
  }, [imagesLoaded, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {!gameStarted && imagesLoaded && (
        <button
          onClick={startGame}
          className="mb-4 absolute z-10 p-2 bg-green-500 text-white rounded"
        >
          Play
        </button>
      )}
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="bg-cover"
      ></canvas>
    </div>
  );
};

export default App;
