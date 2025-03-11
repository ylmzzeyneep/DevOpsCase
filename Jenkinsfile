pipeline {
    agent any

    environment {
        SNYK_CREDENTIALS = 'snyk-token'
        DOCKERHUB_CREDENTIALS = 'docker-hub-credentials'
        BACKEND_HEALTH_URL = 'http://localhost:5001/health'
        ARGOCD_SERVER = '34.133.27.32:31125'  
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/ylmzzeyneep/DevOpsCase.git'
            }
        }

        stage('Snyk Security Scan') {
            steps {
                script {
                    withCredentials([string(credentialsId: SNYK_CREDENTIALS, variable: 'SNYK_TOKEN')]) {
                        dir('backend') {
                            sh 'snyk auth $SNYK_TOKEN'
                            sh 'snyk test || true'
                            echo "✅ Backend için Snyk güvenlik taraması tamamlandı."
                        }
                    }
                }
            }
        }

        stage('Build Images') {
            stage('Build Backend Image') {
                steps {
                    script {
                            dockerImage = docker.build("ylmzzeyneep/backendapp:${env.BUILD_NUMBER}")
                            echo "✅ Backend imajı başarıyla build edildi."
                    }
                        
                }
            }
            
        }

          stage('Trivy Image Scan') {
            steps {
                script {
                    sh "trivy image ylmzzeyneep/newbackendapp:${env.BUILD_NUMBER} || true"
                    echo "✅ Backend image için Trivy güvenlik taraması tamamlandı."
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        echo "✅ Docker Hub'a başarıyla giriş yapıldı."
                    }
                }
            }
        }

        stage('Push Images') {
            stage('Push Backend Image') {
                steps {
                    script {
                        docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                            dockerImage.push()
                            echo "✅ Backend imajı başarıyla Docker Hub'a yüklendi."
                        }
                    }
                }
            }
        }

        stage('Test Backend Health Check') {
            steps {
                script {
                    def status = sh(script: "curl -s -o /dev/null -w '%{http_code}' ${BACKEND_HEALTH_URL}", returnStdout: true).trim()
                    if (status == "200") {
                        echo "✅ Backend servisi çalışıyor."
                    } else {
                        error "❌ Backend servisi çalışmıyor! HTTP Yanıt Kodu: ${status}"
                    }
                }
            }
        }

    }
}
