pipeline {
  agent any

  stages {
    stage('Clone') {
      steps {
        git 'https://github.com/yasiith/Nethu_Education_Institute_Management_System'
      }
    }

    stage('Build Docker Images') {
      steps {
        sh 'docker-compose build'
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker-compose down'
        sh 'docker-compose up -d'
      }
    }
  }
}
