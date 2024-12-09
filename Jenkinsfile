pipeline {
    agent any
    environment {
        USERNAME = "extlespinosa"
        def imageName = "backend-test"
        def registry = "localhost:8082"
        def latestTag = "${registry}/${imageName}:latest"
        def buildNumber = "${registry}/${imageName}:${BUILD_NUMBER}"
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
                stage("Quality assurance -quality gate"){
                    steps{
                        script {
                            timeout(time: 1, unit: 'MINUTES') {
                                def qg = waitForQualityGate()
                                if (qg.status != 'OK') {
                                    error "Pipeline aborted due to quality gate failure: ${qg.status}"
                                }
                            }
                            
                        }
                    }
                }
            }
        }
        stage("delivery - subida a nexus"){
           steps{
                script {
                    docker.withRegistry("http://localhost:8082", "registry"){
                        sh "docker build -t ${imageName} ."
                        sh "docker tag ${imageName}:latest ${latestTag}:latest"
                        sh "docker tag ${imageName}:latest ${buildNumber}"
                        sh "docker push ${latestTag}:latest"
                        sh "docker push ${buildNumber}"
                    }
                }
           } 
        }
    }
}