pipeline {
    agent any

    environment {
        // Define any environment variables here if needed
        NODE_ENV = 'development'
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Checkout your source code
                git 'https://github.com/Jewzzz/ci-cd-node-app'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('express-api-demo') {
                    script {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('express-api-demo') {
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t express-api ./express-api-demo'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker run -d -p 3000:3000 --name express-api express-api'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Build and tests passed!'
        }
        failure {
            echo 'Something went wrong!'
        }
    }
}
