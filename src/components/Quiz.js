import React from 'react';
import {QuizData} from './QuizData';

class Quiz extends React.Component {
state = {
    userAnswer: null,
    currentQuestion: 0,
    options: [],
    quizEnd: false,
    score: 0,
    disabled: true,
    start: true,
    answer: null
}

    loadQuiz = () => {
        const {currentQuestion} = this.state;
        this.setState(() => {
            return {
                questions: QuizData[currentQuestion].question,
                options: QuizData[currentQuestion].options,
                answer: QuizData[currentQuestion].answer
            };
        });
    };

    componentDidMount() {
        this.loadQuiz();
    }

    nextQuestionHandler = () => {
      const {userAnswer, answer} = this.state;
      this.setState({
         currentQuestion: this.state.currentQuestion + 1
      })

      if (userAnswer === answer) {
        this.setState({
            score: this.state.score + 1
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
                answer: QuizData[currentQuestion].answer
            };
        })
      }
    }

    checkAnswer = guess => {
        this.setState({
            userAnswer: guess, 
        })

        if (guess === this.state.answer) {
            this.setState({
                disabled: false 
            })
        } else {
            this.setState({
                disabled: true 
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

    startHandler = () => {
        this.setState({
            start: false
        })
    }

    startOverHandler = () => {
        this.setState({
            start: true
        })
    }

    render() {
        const {questions, options, currentQuestion, userAnswer, quizEnd, start} = this.state;
        console.log("HELLO")
            
            if (start) {
                return (
                    <div> 
                        <h2>
                            Happy Birthday Kat!! 
                        </h2>

                        <h3>
                            In celebration of your special day, a group of 45+ people worked together to make this present happen:  </h3>
                            <h3>
                            All of them wrote you a heartfelt birthday message. To continue to the next message, you must correctly guess the author from a list of options. 
                            </h3>
                            <h3>
                            When you're ready, the world is yours. 
                            </h3>
                        <button 
                    className = "ui inverted button"
                    onClick={this.startHandler}
                    >
                      Begin</button>
                    </div>
                )
            }
        
            if(quizEnd) {
                return (
                    <div>
                        <h2>
                            Messages Exhausted: You correctly guessed {this.state.score} authors
                        </h2>

                        <button 
                            className = "ui inverted button"
                            onClick={this.startOverHandler}
                        >
                            Start Over</button>

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