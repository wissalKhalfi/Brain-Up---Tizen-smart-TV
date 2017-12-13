/**

  The Initial Developer of the Original Code is
  Matthieu  - http://www.programmation-facile.com/
  Portions created by the Initial Developer are Copyright (C) 2013
  the Initial Developer. All Rights Reserved.

  Contributor(s) :

 */


/**
 * Code source :
 * https://github.com/hextris/hextris
 */



/**
 * Gestion de l'affichage du jeu
 * 
 */


// t: current time, b: begInnIng value, c: change In value, d: duration
function easeOutCubic(t, b, c, d) 
{
    return c * ((t = t / d - 1) * t * t + 1) + b;
}


/**
 * Affichage du texte
 * 
 * @param  {[type]} x        [description]
 * @param  {[type]} y        [description]
 * @param  {[type]} fontSize [description]
 * @param  {[type]} color    [description]
 * @param  {[type]} text     [description]
 * @param  {[type]} font     [description]
 * @return {[type]}          [description]
 */
function renderText(x, y, fontSize, color, text, font) 
{
    ctx.save();
    if (!font)
        font = 'px/0 Roboto';

    fontSize *= settings.scale;
    ctx.font = fontSize + font;
    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.fillText(text, x, y + (fontSize / 2) - 9 * settings.scale);
    ctx.restore();
}


/**
 * Affiche le score
 * 
 * @return {[type]} [description]
 */
function drawScoreboard()
{
    if (scoreOpacity < 1) 
    {
        scoreOpacity += 0.01;
        textOpacity += 0.01;
    }

    ctx.globalAlpha = textOpacity;
    var scoreSize = 50;
    var scoreString = String(score);
    
    if (scoreString.length == 6)
        scoreSize = 43;
    else if (scoreString.length == 7) 
        scoreSize = 35;
    else if (scoreString.length == 8) 
        scoreSize = 31;
    else if (scoreString.length == 9) 
        scoreSize = 27;
    
    if (rush ==1)
        var color = "rgb(236, 240, 241)";
    else
        var color = "#e74c3c";

    if (gameState === 0) 
    {
        renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale, trueCanvas.height / 2 + gdy, 60, "rgb(236, 240, 241)", String.fromCharCode("0xf04b"), 'px FontAwesome');
        renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale, trueCanvas.height / 2 + gdy - 170 * settings.scale, 150, "#2c3e50", "Hextris");
        renderText(trueCanvas.width / 2 + gdx + 5 * settings.scale, trueCanvas.height / 2 + gdy + 100 * settings.scale, 20, "rgb(44,62,80)", 'Jouer !');
    } 
    else if (gameState != 0 && textOpacity > 0) 
    {
        textOpacity -= 0.05;
        renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale, trueCanvas.height / 2 + gdy, 60, "rgb(236, 240, 241)", String.fromCharCode("0xf04b"), 'px FontAwesome');
        renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale, trueCanvas.height / 2 + gdy - 170 * settings.scale, 150, "#2c3e50", "Hextris");
        renderText(trueCanvas.width / 2 + gdx + 5 * settings.scale, trueCanvas.height / 2 + gdy + 100 * settings.scale, 20, "rgb(44,62,80)", 'Jouer !');
        ctx.globalAlpha = scoreOpacity;
        renderText(trueCanvas.width / 2 + gdx, trueCanvas.height / 2 + gdy, scoreSize, color, score);
    } 
    else 
    {
        ctx.globalAlpha = scoreOpacity;
        renderText(trueCanvas.width / 2 + gdx, trueCanvas.height / 2 + gdy, scoreSize, color, score);
    }

    ctx.globalAlpha = 1;
}


/**
 * Efface le tableau de bord du jeu
 * 
 * @return {[type]} [description]
 */
function clearGameBoard() {
    drawPolygon(trueCanvas.width / 2, trueCanvas.height / 2, 6, trueCanvas.width / 2, 30, hexagonBackgroundColor, 0, 'rgba(0,0,0,0)');
}


function drawPolygon(x, y, sides, radius, theta, fillColor, lineWidth, lineColor) 
{
    ctx.fillStyle = fillColor;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;

    ctx.beginPath();
    var coords = rotatePoint(0, radius, theta);
    ctx.moveTo(coords.x + x, coords.y + y);
    var oldX = coords.x;
    var oldY = coords.y;
    for (var i = 0; i < sides; i++)
    {
        coords = rotatePoint(oldX, oldY, 360 / sides);
        ctx.lineTo(coords.x + x, coords.y + y);
        oldX = coords.x;
        oldY = coords.y;
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'rgba(0,0,0,0)';
}


function toggleClass(element, active) 
{
    if ($(element).hasClass(active))
        $(element).removeClass(active);
    else
        $(element).addClass(active);
}


/**
 * Affiche des messages au joueur
 * 
 * @param  {[type]} text [description]
 * @return {[type]}      [description]
 */
function showText(text) 
{
    var messages = {
        'paused': "<div class='centeredHeader unselectable'>Pause</div><br><div class='unselectable centeredSubHeader'>Appuyez sur p pour reprendre la partie</div><div style='height:100px;line-height:100px;cursor:pointer;'></div><div class='unselectable centeredSubHeader' style='margin-top:-50px;'><a href = 'http://www.programmation-facile.com/creer-jeux-mobiles-tablettes-web/' target='_blank'>Cliquez ici pour télécharger le code source de jeux sur mobiles.</a></div>",
        'pausedAndroid': "<div class='centeredHeader unselectable'>Pause</div><br><div class='unselectable centeredSubHeader'>Appuyez <i class='fa fa-play'></i> pour reprendre la partie</div><div style='height:100px;line-height:100px;cursor:pointer;'></div><div class='unselectable centeredSubHeader' style='margin-top:-50px;'><a href = 'http://www.programmation-facile.com/creer-jeux-mobiles-tablettes-web/' target='_blank'>Cliquez ici pour télécharger des codes source de jeux sur mobiles.</a></div>",
        'start': "<div class='centeredHeader unselectable' style='line-height:80px;'>Appuyez sur enter démarrer une partie</div>",
        'gameover': "<div class='centeredHeader unselectable'> Game Over : " + score + " pts</div><br><div style='font-size:24px;' class='centeredHeader unselectable'> Meilleurs Scores:</div><table class='tg' style='margin:0px auto'> "
    };

    if (text == 'paused') 
    {
        if (settings.os == 'android')
            text = 'pausedAndroid';
    }

    if (text == 'gameover') 
    {
        var allZ = 1;
        var i;

        for (i = 0; i < 3; i++)
        {
            if (highscores.length > i) 
            {
                messages['gameover'] += "<tr> <th class='tg-031e'>" + (i + 1) + ".</th> <th class='tg-031e'>" + highscores[i] + " pts</th> </tr>";
            }
        }

        var restartText;
        if (settings.platform == 'mobile')
            restartText = 'Appuyez ici pour relancer la partie!';
        else
            restartText = 'Appuyez sur enter (ou cliquez ici!) pour relancer la partie!';


        messages['gameover'] += "</table><br><div class='unselectable centeredSubHeader' id = 'tapToRestart'>" + restartText + "</div>";
        if (allZ) 
        {
            for (i = 0; i < highscores.length; i++) 
            {
                if (highscores[i] !== 0)
                    allZ = 0;
            }
        }
    }

    messages['gameover'] += "<div class='fltrt' id='tweetStuff'><a class='tweet' href='http://www.programmation-facile.com/creer-jeux-mobiles-tablettes-web/' data-lang='en' data-related='hextris:hextris' target='_blank'>Cliquez ici pour télécharger des codes source de jeux sur mobiles.</a></div>"
    $(".overlay").html(messages[text]);
    $(".overlay").fadeIn("1000", "swing");

    if (text == 'gameover')
    {
        if (settings.platform == 'mobile') 
        {
            $('.tg').css('margin-top', '6px');
            $("#tapToRestart").css('margin-top','-19px')
        }
    }
}


/**
 * Configuration du menu principal
 * 
 */
function setMainMenu() 
{
    gameState = 4;
    canRestart = false;
    setTimeout(function() {
        canRestart = 's';
    }, 500);
    $('#restartBtn').hide();
    
    if ($($("#pauseBtn").children()[0]).attr('class').indexOf('pause') == -1)
        $("#pauseBtnInner").html('<i class="fa fa-pause fa-2x"></i>');
    else 
        $("#pauseBtnInner").html('<i class="fa fa-play fa-2x"></i>');
}


/**
 * Pour masquer un texte
 * 
 * @return {[type]} [description]
 */
function hideText() 
{
    $(".overlay").fadeOut("1000", function() {
        $(".overlay").html("");
    })
}


/**
 * Affichage de l'écran game over
 * 
 * @return {[type]} [description]
 */
function gameOverDisplay() 
{
    $("#attributions").show();
    var c = document.getElementById("canvas");
    c.className = "blur";
    showText('gameover');
    showbottombar();
}


/**
 * Mise en pause du jeu
 * 
 * @param  {[type]} o [description]
 * @return {[type]}   [description]
 */
function pause(o) 
{
    writeHighScores();
    var message;
    if (o)
        message = '';
    else
        message = 'paused';

    var c = document.getElementById("canvas");
    if (gameState == -1) 
    {
        $('#restartBtn').fadeOut(150, "linear");
       
        if ($('#helpScreen').is(':visible'))
            $('#helpScreen').fadeOut(150, "linear");

        $("#pauseBtnInner").html('<i class="fa fa-pause fa-2x"></i>');
        $('.helpText').fadeOut(200, 'linear');
        hideText();
        hidebottombar();
        setTimeout(function() {
            gameState = prevGameState;
        }, 200)
    } 
    else if (gameState != -2 && gameState !== 0 && gameState !== 2)
    {
        $('#restartBtn').fadeIn(150, "linear");
        $('.helpText').fadeIn(200, 'linear');
        showbottombar();
       
        if (message == 'paused')
            showText(message);

        $("#pauseBtnInner").html('<i class="fa fa-play fa-2x"></i>');
        prevGameState = gameState;
        gameState = -1;
    }
}


