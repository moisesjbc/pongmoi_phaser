
function Ball(x, y, velocity_x, velocity_y)
{
    this.initial_position = {
        x: x,
        y: y
    }

    this.initial_velocity = {
        x: velocity_x,
        y: velocity_y
    }

    // Create a bitmap representing the ball.
    var ball_bitmap = game.add.bitmapData(25, 25);
    ball_bitmap.ctx.rect(0, 0, 25, 25);
    ball_bitmap.ctx.fillStyle = '#FFFFFF';
    ball_bitmap.ctx.fill();

    // Bitmaps can't have physics on their own, so we create a sprite as a
    // container.
    this.ball = game.add.sprite(x, y, ball_bitmap);

    // Enable and configure ball physics.
    game.physics.arcade.enable(this.ball);
    this.ball.body.enable = true;
    this.ball.body.setSize(25,25);
    this.ball.body.velocity.x = velocity_x;
    this.ball.body.velocity.y = velocity_y;
    this.ball.body.maxVelocity.set(paddle_max_speed);
    this.ball.body.bounce.set(100);
}


Ball.prototype.update = function(player_1, player_2)
{
    // Restart ball if it goes out of screen.
    if( this.ball.position.x < 0 || this.ball.position.x > 800 ){
        // Increase the score of the farest player (in X).
        if( Math.abs(this.ball.position.x - player_1.paddle.position.x) > Math.abs(this.ball.position.x - player_2.paddle.position.x) ){
            player_1.score++;
        }else{
            player_2.score++;
        }

        // Restart ball position and velocity.
        if( this.ball.position.x < 0 ){
            this.ball.body.velocity.x = -this.initial_velocity.x;
        }else{
            this.ball.body.velocity.x = this.initial_velocity.x;
        }
        this.ball.position.set(this.initial_position.x, this.initial_position.y);
        this.ball.body.velocity.y = this.initial_velocity.y;
    }
}


Ball.prototype.restart = function()
{
    
}
