$(function () {
    // khai bao object
    var container = $('#container');
    var bird = $('#bird');
    var pole = $('.pole');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var score = $('#score');

    // parseInt cho tinh toan
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('height'));
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());
    var speed = 10; 

    // function trong game
    var go_up = false;
    var score_updated = false;
    var game_over = false;

    // playgame bat dau
    function playGame() {
        // Realtime cho game 
        var the_game = setInterval(function () {
            if (collision(bird, pole_1) || // neu cham ong tren
                collision(bird, pole_2) || // cham ong duoi
                parseInt(bird.css('top')) <= 0 || // cham khung game tren
                parseInt(bird.css('top')) > container_height - bird_height // cham khung game duoi
                )
            {
                stop_the_game(); // thua
            }
            else
            {
                // vi tri hien tai cua ong nuoc
                var pole_current_position = parseInt(pole.css('right'));
                // update score
                if (pole_current_position > container_width - bird_left)
                {
                    if (score_updated === false)
                    {
                        score.text(parseInt(score.text()) + 1); // +1
                        score_updated = true;
                    }
                }

                // kiem tra cac ong da di ra khoi game
                if (pole_current_position > container_width) {
                    var new_height = parseInt(Math.random() * 100); 
                    // tao chieu cao cho ong nuoc ngau nhien
                    pole_1.css('height', pole_initial_height + new_height);
                    pole_2.css('height', pole_initial_height - new_height);
                    score_updated = false;
                    pole_current_position = pole_initial_position; // gan vi tri hien tai = vi tri ban dau cua ong nuoc

                }

                // di chuyen ong nuoc
                pole.css('right', pole_current_position + speed);

                // neu go up k dc dieu khien
                if (go_up === false) {
                    go_down(); // roi xuong
                }
            }
        }, 40);
    }

    // khi nha chuot
    $('#container').mouseup(function (e) {    
        clearInterval(go_up); // xoa realtime bay len
        go_up = false;
    });

    // khi nhap chuot
    $('#container').mousedown(function (e) {
        go_up = setInterval(up, 40); // realtime is set
    });

    // choi game dc nhan vao
    $('#play_btn').click(function() {
         playGame(); // chay 
         $(this).hide(); // an nut choi
    });    

    // ham di chuyen chim roi xuong
    function go_down() {
        bird.css('top', parseInt(bird.css('top')) + 10);
        bird.css('transform', 'rotate(50deg)'); // nghieng object 50 degree
    }

    // ham bird bay len
    function up() {
        bird.css('top', parseInt(bird.css('top')) - 20);
        bird.css('transform', 'rotate(-10deg)'); // nghieng object -10degree
    }

    // thua game
    function stop_the_game() {
        clearInterval(playGame()); // xoa realtime
        game_over = true;
        $('#restart_btn').slideDown(); // va hien nut choi lai
    }

    // khi click vao nut choi lai
    $('#restart_btn').click(function () {
        location.reload(); // load lai trang
    });

    // ham va cham giua 2 object
    function collision($div1, $div2) {
        // khai bao bien thong so 2 obj
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        // xay ra va cham
        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
            return false;
        }
        // hoac ko xay ra 
        else
        {
            return true;
        }
    }
});
