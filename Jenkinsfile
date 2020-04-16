pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') { 
            steps {
                dir("client-app") {
                    sh "pwd"
                    sh 'npm install'
                } 
            }
        }
        stage('Test') { 
            steps {
                dir("jenkins/scripts/") {
                    sh "pwd"
		            sh "ls"
                    sh './test.sh'
                }
            }
        }
    }
}
