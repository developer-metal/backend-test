pipeline {
    agent any
    environment {
        USERNAME = "extlespinosa",
    }
    stages{
        stage("build - instalacion dependencias"){
            agent {
                docker {
                    label 'contenedores'
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            stages{
                stage("build - instalacion dependencias"){
                    steps{
                        sh 'npm install'
                    }
                }
                stage("build - ejecucion de test"){
                    steps{
                        sh 'npm run test'
                    }
                }
                stage("build - build del proyecto"){
                    steps{
                        sh 'npm run build'
                    }
                }
            }
        }
        stage("Quality assurance"){
            agent {
                docker {
                    label 'contenedores'
                    image 'sonarsource/sonar-scanner-cli'
                    args '--network=devops-infra_default'
                    reuseNode true
                }
            }
            stages{
                stage("Quality assurance - sonarqube"){
                    steps{
                        withSonarQubeEnv('sonarqube') {
                            sh 'sonar-scanner'
                        }
                    }
                }
            }
        }
        stage("delivery - subida a nexus"){
           steps{
                script {
                    docker.withRegistry("http://localhost:8082", "registry"){
                        sh 'docker build -t backend-test .'
                        sh 'docker tag backend-test:latest localhost:8082/backend-test:latest'
                        sh 'docker push localhost:8082/backend-test:latest'
                    }
                }
           } 
        }
    }
}