pipeline {
    agent any 
    
    environment {
        NODE_ENV = 'development'
    }

    stages { 
        stage('Clone Repository') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/Jewzzz/ci-cd-node-app', credentialsId: 'github-token'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('express-api-demo') {
                    bat 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('express-api-demo') {
                    bat 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {  
                bat 'docker build -t jewzzzz/nodeapp-cuban:%BUILD_NUMBER% .'
                bat 'docker tag jewzzzz/nodeapp-cuban:%BUILD_NUMBER% jewzzzz/nodeapp-cuban:latest'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'docker-password', variable: 'docker_psw')]) {
                    bat "docker login -u jewzzzz -p %docker_psw%"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                bat 'docker push jewzzzz/nodeapp-cuban:%BUILD_NUMBER%'
                bat 'docker push jewzzzz/nodeapp-cuban:latest'
            }
        }
    }

    post {
        always {
            bat 'docker logout'
        }
    }
}
