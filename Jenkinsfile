pipeline {
  agent any

  stages {
    stage('Clone') {
      steps {
        git 'https://github.com/your/repo.git'
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
