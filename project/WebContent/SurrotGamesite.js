// 即時関数で囲っておく（スコープを限定）
  (function(){
    var score = 0;
    var interval = 400;
    var timers = []; // スロット
    var results = []; // スロットを止めた時の数字
    var stopCount = 0; // スロットを何個止めたか判別に必要

    // イベントの登録（今回はクリックした時）
    // 左のスロットをクリックした時、タイマーを止める
    document.getElementById('stop0').onclick = function() {
      stopSlot(0); // 左のスロット
    }

    // 真ん中スロットをクリックした時、タイマーを止める
    document.getElementById('stop1').onclick = function() {
      stopSlot(1);
    }

    // 右のスロットをクリックした時、タイマーを止める
    document.getElementById('stop2').onclick = function() {
      stopSlot(2);
    }

    // スロットをスタートさせる
    startSlot();

    // 左右のスロットをスタートさせる処理の中身
    function startSlot() {

      // 初期化（空の状態に戻す）
      stopCount = 0; // スロットを何個止めたか判別に必要
      timers = []; // スロット
      results = []; // スロットを止めた時の数字

      // スロット開始
      runSlot(0);
      runSlot(1);
      runSlot(2);
    }

    // スロットを回す処理の中身
    function runSlot(num) {

      // 全てのスロットの現在表示されているテキストを取得
      var slotValue = document.getElementById('slot' + num);

      // 9より上の数字になったら0へ戻る
      if(slotValue.textContent < 9) {
        slotValue.textContent ++;
      } else {
        slotValue.textContent = 0;
      }

      // スロットの数字をカウントさせる
      timers[num] = setTimeout(function() {

        // スロットの数字をカウントさせる処理
        runSlot(num);
      }, interval);
    }

    // スロットを止める処理の中身
    function stopSlot(num) {

      // スロットを止める
      clearTimeout(timers[num]);

      // スロットを止めた際の数字を取得
      results[num] = document.getElementById('slot' + num).textContent;

      // 何個めのスロットかを判別
      stopCount++;

      // 2個めのスロットを止めた場合に結果を表示する
      if (stopCount == 3) {
        checkResult();
      }
    }

    // 全てのスロットを止めた結果
    function checkResult() {

      // 2つの数字が同じであれば次へ、そうでなければGAMEOVER
      if (results[0] == results[1]) {
        alert('おめでとう！');

        score += 200; // 得点を足す
        interval *= 0.4;
        // 得点追加の処理
        getScore();
        // 次のゲームに進む
        startSlot();
      } else {
        gameover();
      }
    }

    // 得点追加時の処理
    function getScore() {
      var target = document.getElementById('score');
      target.textContent = score;
    }

    // 揃えられなかった時
    function gameover() {
      alert('ゲームオーバー…。');
    }

  })();