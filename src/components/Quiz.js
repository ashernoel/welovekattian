import React from 'react';
import {QuizData} from './QuizData';

class Quiz extends React.Component {
state = {
    userAnswer: null,
    currentQuestion: 0,
    options: [],
    quizEnd: false,
    score: 0,
    disabled: true
}

    loadQuiz = () => {
        const {currentQuestion} = this.state;
        this.setState(() => {
            return {
                questions: QuizData[currentQuestion].question,
                options: QuizData[currentQuestion].options,
                answers: QuizData[currentQuestion].answer
            };
        });
    };



    componentDidMount() {
        this.loadQuiz();
    }

    nextQuestionHandler = () => {
      const {userAnswer, answer, score} = this.state;
      this.setState({
        currentQuestion: this.state.currentQuestion + 1
      })

      if (userAnswer === answer) {
        this.setState({
            score: score + 1
        })
      }
    }

    componentDidUpdate(prevProps, prevState) {
      const {currentQuestion} = this.state; 
      if(this.state.currentQuestion !== prevState.currentQuestion) {
        this.setState(() => {
            return {
                disabled: true,
                questions: QuizData[currentQuestion].question,
                options: QuizData[currentQuestion].options,
                answers: QuizData[currentQuestion].answer
            };
        })
      }
    }

    checkAnswer = guess => {
        const {userAnswer, answer} = this.state;
        this.setState({
            userAnswer: guess,
            disabled: false 
        })

        if (userAnswer === answer) {
            this.setState({
                disabled: false 
            })
        }
    }

    finishHandler = () => {
        if(this.state.currentQuestion ===  QuizData.length - 1) {
            this.setState({
                quizEnd: true
            })
        }
    }

    render() {
        const {questions, options, currentQuestion, userAnswer, quizEnd} = this.state;
        console.log("HELLO")
            if(quizEnd) {
                return (
                    <div>
                        <h2>
                            Messages Exhausted: You correctly guessed {this.state.score} authors
                        </h2>

                        <p> Contributors: </p> 

                        <ul>
                            {QuizData.map((item, index) => (
                                <li className = "ui flaoting message options"  key = {index}>
                                    {item.answer}
                                </li>
                            ))}
                        </ul>

                    </div>
                )
            }
        
        
        
        return (
            <div className='App'>
                <h2>{questions}</h2>
                <span> {`Message ${currentQuestion + 1} out of ${QuizData.length}`}</span>
                {options.map(option => (
                    <p key = {option.id} 
                    onClick={() => this.checkAnswer(option)}
                    className = {`ui floating message options
                    ${userAnswer === option ? "selected" : null }`}
                    >
                        {option}
                    
                    </p>
                ))}
                {currentQuestion < QuizData.length - 1 && 
                <button
                  className = "ui inverted button"
                  disabled = {this.state.disabled}
                  onClick={this.nextQuestionHandler}
                >
                    Next
                </button>}
                {currentQuestion === QuizData.length - 1 && 
                  <button 
                    className = "ui inverted button"
                    disabled = {this.state.disabled}
                    onClick={this.finishHandler}
                  >
                      Finish</button>
                }
            </div>
        )
    }
}

export default Quiz;