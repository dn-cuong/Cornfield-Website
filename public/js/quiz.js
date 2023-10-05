$.ajax({
    type: "GET",
    url: `/api/question/${location.pathname.split('/')[2]}`,
    success: (questions) => {
        const start_btn = document.querySelector(".start_btn button");
        const info_box = document.querySelector(".info_box");
        const exit_btn = info_box.querySelector(".buttons .quit");
        const continue_btn = info_box.querySelector(".buttons .restart");
        const quiz_box = document.querySelector(".quiz_box");
        const result_box = document.querySelector(".result_box");
        const option_list = document.querySelector(".option_list");
        const time_line = document.querySelector("header .time_line");
        const timeText = document.querySelector(".timer .time_left_txt");
        const timeCount = document.querySelector(".timer .timer_sec");
        let userAnswer = [];
        // if startQuiz button clicked
        start_btn.onclick = ()=>{
            info_box.classList.add("activeInfo"); //show info box
        }
        // if exitQuiz button clicked
        exit_btn.onclick = ()=>{
            info_box.classList.remove("activeInfo"); //hide info box
        }
        // if continueQuiz button clicked
        continue_btn.onclick = ()=>{
            info_box.classList.remove("activeInfo"); //hide info box
            quiz_box.classList.add("activeQuiz"); //show quiz box
            showQuetions(0); //calling showQestions function
            queCounter(1); //passing 1 parameter to queCounter
            startTimer(45); //calling startTimer function
            startTimerLine(0); //calling startTimerLine function
        }
        let timeValue =  45;
        let que_count = 0;
        let que_numb = 1;
        let counter;
        let counterLine;
        let widthValue = 0;
        const restart_quiz = result_box.querySelector(".buttons .restart");
        const quit_quiz = result_box.querySelector(".buttons .quit");
        // if restartQuiz button clicked
        restart_quiz.onclick = ()=>{
            quiz_box.classList.add("activeQuiz"); //show quiz box
            result_box.classList.remove("activeResult"); //hide result box
            userAnswer = [];
            timeValue = 45;
            que_count = 0;
            que_numb = 1;
            widthValue = 0;
            showQuetions(que_count); //calling showQestions function
            queCounter(que_numb); //passing que_numb value to queCounter
            clearInterval(counter); //clear counter
            clearInterval(counterLine); //clear counterLine
            startTimer(timeValue); //calling startTimer function
            startTimerLine(widthValue); //calling startTimerLine function
            timeText.textContent = "Time Left"; //change the text of timeText to Time Left
            next_btn.classList.remove("show"); //hide the next button
        }
        // if quitQuiz button clicked
        quit_quiz.onclick = ()=>{
            window.location.reload(); //reload the current window
        }
        const next_btn = document.querySelector("footer .next_btn");
        const bottom_ques_counter = document.querySelector("footer .total_que");
        // if Next Que button clicked
        next_btn.onclick = ()=>{
            if(que_count < questions.length - 1){ //if question count is less than total question length
                que_count++; //increment the que_count value
                que_numb++; //increment the que_numb value
                showQuetions(que_count); //calling showQestions function
                queCounter(que_numb); //passing que_numb value to queCounter
                clearInterval(counter); //clear counter
                clearInterval(counterLine); //clear counterLine
                startTimer(timeValue); //calling startTimer function
                startTimerLine(widthValue); //calling startTimerLine function
                timeText.textContent = "Time Left"; //change the timeText to Time Left
                next_btn.classList.remove("show"); //hide the next button
            }else{
                clearInterval(counter); //clear counter
                clearInterval(counterLine); //clear counterLine
                showResult(); //calling showResult function
            }
        }
        // getting questions and options from array
        function showQuetions(index){
            const que_text = document.querySelector(".que_text");
            //creating a new span and div tag for question and option and passing the value using array index
            let que_tag = '<span>'+ questions[index].question +'</span>';
            let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
                + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
                + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
                + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
            que_text.innerHTML = que_tag; //adding new span tag inside que_tag
            option_list.innerHTML = option_tag; //adding new div tag inside option_tag`
            document.querySelectorAll('.option')
                .forEach(element => {
                    element.addEventListener("click", () => {
                        optionSelected(element);
                    })
                })
        }
        // creating the new div tags which for icons
        let tickIconTag = '<div class="icon tick"><i class="fa fa-check"></i></div>';
        //if user clicked on option

        function optionSelected(answer){
            let userAns = answer.textContent; //getting user selected option
            clearInterval(counter); //clear counter
            clearInterval(counterLine); //clear counterLine
            const allOptions = option_list.children.length; //getting all option items
            answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
            userAnswer.push(userAns);
            for(let i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
        function showResult(){
            info_box.classList.remove("activeInfo"); //hide info box
            quiz_box.classList.remove("activeQuiz"); //hide quiz box
            result_box.classList.add("activeResult"); //show result box
            const scoreText = result_box.querySelector(".score_text");
            $.ajax({
                type: "POST",
                url: "/api/question/answer",
                data: {answer: userAnswer},
                success: (data) => {
                    //creating a new span tag and passing the user score number and total question number
                    scoreText.innerHTML = '<span> You got <p>' + data + '</p> out of <p>' + questions.length + '</p></span>';  //adding new span tag inside score_Text
                }
            })
        }
        function startTimer(time){
            counter = setInterval(timer, 1000);
            function timer(){
                timeCount.textContent = time; //changing the value of timeCount with time value
                time--; //decrement the time value
                if(time < 9){ //if timer is less than 9
                    let addZero = timeCount.textContent;
                    timeCount.textContent = "0" + addZero; //add a 0 before time value
                }
                if(time < 0){ //if timer is less than 0
                    clearInterval(counter); //clear counter
                    timeText.textContent = "Time Off"; //change the time text to time off
                    userAnswer.push("Time Off");
                    const allOptions = option_list.children.length; //getting all option items
                    for(let i=0; i < allOptions; i++){
                        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
                    }
                    next_btn.classList.add("show"); //show the next button if user selected any option
                }
            }
        }
        function startTimerLine(time){
            counterLine = setInterval(timer, 45);
            function timer(){
                time += 1; //upgrading time value with 1
                time_line.style.width = time + "px"; //increasing width of time_line with px by time value
                if(time > 1000){ //if time value is greater than 549
                    clearInterval(counterLine); //clear counterLine
                }
            }
        }
        function queCounter(index){
            //creating a new span tag and passing the question number and total question
            bottom_ques_counter.innerHTML = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
            //adding new span tag inside bottom_ques_counter
        }
    }
})
