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
      this.setState({
         currentQuestion: this.state.currentQuestion + 1
      })

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
                disabled: true,
                score: this.state.score + 1
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
            if (start) {
                return (
                  <div className='intro'>
                    <Container>
                        <Box m={1}>
                            <Typography variant="h4" align="center">
                                Happy Birthday, Kat!!
                            </Typography>
                            <Paper style={{ padding: 14, width: "100%", maxWidth: 600, margin: "12px auto" }}>
                              <Typography variant="body1" gutterBottom>
                              In celebration of your special day, {QuizData.length} close friends wrote you heartfelt birthday messages! 
                              
                              <br /><br />
                              To continue, correctly guess their respective author.
                              <br /><br />
                              When you're ready, enjoy! PS: The site tracks the number of inccorect guesses ;)

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
                    <Container>
                        <Box m={1}>
                            <Typography variant="h4" align="center">
                                The End!
                            </Typography>
                            <Paper style={{ padding: 14, width: "100%", maxWidth: 600, margin: "12px auto" }}>
                              <Typography variant="body1" gutterBottom>
                               Incorrect Guesses: {this.state.score}
                               <br /><br />
                              Contributors (in order of submission): Raymond Feng, Max Guo, Ivan Specht, Damon Halback, Matthew Hajjar, Nikhil Dharmaraj, Kelsey Wu, Shania Wang, Raj Movva, Sian Smith, Kevin Mao, Jocelin Su, Sheldon Tan, Ruhi Sayana, Joanna Lin, Derek Zheng, Anna Wang, Karen Ge, Moses Mayer, Ashley Lin, Cindy Wang, David Liu, Christie Chen, Jeffrey Kwan, Emiko Armstrong, Dylan Zhou, Asher Noel, Melinda Sun, Rachel Li, Ginnie Ma, Jacqueline Wei, Kelly Shen, Jeffrey Gu, Kat Zhang, David Ma, Justin Xie, Arul Kapoor, Lizzy Ling, Benji Kan, Ellen Dong, Melissa Kwan, Jimmy Lin, Haneul Shin, Jun Kim, Kathryn Zhou, Sidra Xu, Hahn Lheem, Claire Zhou.
                              <br /><br />
                              Full List of Responses: <Link href ="https://docs.google.com/spreadsheets/d/1cnH9YdEm5oBJa8m-lM7ngTJSjiKNnx5lsM2vNYR1Bo8/edit?usp=sharing"> here </Link>
                              <br /><br />
                              Github: <Link href ="https://github.com/ashernoel/welovekattian"> ashernoel/welovekattian </Link>
                              <br /><br />
                              We are lucky to have you in our lives! HAPPY BIRTHDAY!!
                              </Typography>
                            </Paper>
                            <Button variant="contained" color="primary" onClick={this.startOverHandler}>
                                Start Over
                            </Button>
                        </Box>
                    </Container>

                )
            }



        return (
            <Container>
                        <Box m={1}>
                            <Typography variant="h4" align="center">
                              {`Message ${currentQuestion + 1}`}
                            </Typography>
                            <Paper style={{ padding: 14, width: "100%", maxWidth: 600, margin: "12px auto" }}>
                              <Typography variant="body1" gutterBottom>
                               {questions}
                               <br /><br />
                               {options.map(option => (
                                <p key = {option.id}
                                onClick={() => this.checkAnswer(option)}
                                    className = {`ui floating message options
                                    ${userAnswer === option ? "selected" : null }`}
                                    

                                >
                                {option}
                                </p>
                                ))}
                              </Typography>
                            </Paper>
                            {currentQuestion < QuizData.length - 1 &&
                            <Button variant="contained" color="primary"
                            disabled = {this.state.disabled}
                            onClick={this.nextQuestionHandler}
                            >
                                Next
                            </Button>}

                            {currentQuestion === QuizData.length - 1 &&
                            <Button variant="contained" color="primary"
                                disabled = {this.state.disabled}
                                onClick={this.finishHandler}
                            >
                                Finish</Button>
                            }
                        </Box>
                    </Container>
        )
    }
}

export default Quiz;
