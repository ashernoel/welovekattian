import React from 'react';
import {QuizData} from './QuizData';

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

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
                  <div className='intro'>
                    <Container>
                        <Box m={3}>
                            <Typography variant="h4" align="center">
                                Happy Birthday, Kat!!
                            </Typography>
                            <Paper style={{ padding: 14, width: 640, margin: "12px auto" }}>
                              <Typography variant="body1" gutterBottom>
                              In celebration of your special day, a group of 45+ people worked together to make this present happen:

                              All of them wrote you a heartfelt birthday message. To continue to the next message, you must correctly guess the author from a list of options.

                              When you're ready, the world is yours.

                              </Typography>
                            </Paper>
                            <Button variant="contained" color="primary" onClick={this.startHandler}>
                                Begin
                            </Button>
                        </Box>
                    </Container>
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
                <span> {`Message ${currentQuestion + 1} out of ${QuizData.length}`}</span>
                <h2>"{questions}"</h2>
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
                </button>
              }
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
