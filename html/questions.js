function showMessage(message) {
    alert(message);
}

function checkClickedAnswer(event) {
    const clickedAnswerElement = event.target;
    // 選択した答え(A,B,C,D)
    // フォームデータの入れ物を作る
    const formData = new FormData();

    // 送信したい値を追加
    formData.append('id', clickedAnswerElement.closest('ol.answers').dataset.id);
    formData.append('selectedAnswer', clickedAnswerElement.dataset.answer);

    // xhr = XMLHttpRequestの頭文字です
    const xhr = new XMLHttpRequest();

    // HTTPメソッドをPOSTに指定、送信するURLを指定
    xhr.open('POST', 'answer.php');

    // フォームデータを送信
    xhr.send(formData);

    // loadendはリクエストが完了したときにイベントが発生する
    xhr.addEventListener('loadend', function receivedResponse(event) {
        /** @type {XMLHttpRequest} */
        // addEventListenerによってイベント検知した対象(XMLHttpRequest)のオブジェクトを取得
        const xhr = event.currentTarget;
    
        // http status code を確認
        if (xhr.status === 200) {
            // 正常な処理
    
            // サーバーからのレスポンスがJSONの文字ならJSON.parseでJavaScriptのオブジェクトに変換
            const response = JSON.parse(xhr.response);
    
            // responseの内容を見ながら処理を行う
            displayResult(response.result, response.correctAnswer, response.correctAnswerValue, response.explanation);
        } else {
            // エラーなど
            alert('Error: 回答データの取得に失敗しました');
        }
    });

}

function displayResult(result, correctAnswer, correctAnswerValue, explanation) {
    let message;
    // カラーコードを格納する変数
    let answerColorCode;

    if (result) {
        // 正解の場合
        message='正解です!'
        answerColorCode='';
    } else {
        // 不正解の場合
        message='残念!不正解です!'
        answerColorCode='#f05959';
    }

    showMessage(message);
    document.querySelector('span#correct-answer').innerHTML = correctAnswer + '. ' + correctAnswerValue;
    document.querySelector('span#explanation').innerHTML = explanation;

    // 答え全体を表示
    document.querySelector('span#correct-answer').style.color = answerColorCode;
    document.querySelector('div#section-correct-answer').style.display = 'block';
    setTimeout(() => { document.querySelector('div#section-correct-answer').style.display = 'none' }, 3000);
}

const answersList = document.querySelectorAll('ol.answers li');

answersList.forEach(answer => answer.addEventListener('click', checkClickedAnswer));

