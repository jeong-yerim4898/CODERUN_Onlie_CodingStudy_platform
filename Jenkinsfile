pipeline {
	agent none
	options { skipDefaultCheckout(false) }
	stages {
		stage('git pull') {
			agent any
			steps {
				checkout scm
			}
		}
		stage('Docker build') {
			agent any
			steps {
				sh 'docker build -t client:latest /var/jenkins_home/workspace/coderun/client'
				sh 'docker build -t mainserver:latest /var/jenkins_home/workspace/coderun/server/main'
				sh 'docker build -t imageswagger:latest /var/jenkins_home/workspace/coderun/server/image'
				sh 'docker build -t videoswagger:latest /var/jenkins_home/workspace/coderun/server/video'
			}
		}
		stage('Docker run') {
			agent any
			steps {
				sh 'docker ps -f name=client -q \
        | xargs --no-run-if-empty docker container stop'
				sh 'docker ps -f name=mainserver -q \
				| xargs --no-run-if-empty docker container stop'
				sh 'docker ps -f name=mainswagger -q \
				| xargs --no-run-if-empty docker container stop'
				sh 'docker ps -f name=imageswagger -q \
				| xargs --no-run-if-empty docker container stop'
				sh 'docker ps -f name=videoswagger -q \
				| xargs --no-run-if-empty docker container stop'

				sh 'docker container ls -a -f name=client -q \
        | xargs -r docker container rm'
				sh 'docker container ls -a -f name=mainserver -q \
        | xargs -r docker container rm'
				sh 'docker container ls -a -f name=mainswagger -q \
        | xargs -r docker container rm'
				sh 'docker container ls -a -f name=imageswagger -q \
        | xargs -r docker container rm'
				sh 'docker container ls -a -f name=videoswagger -q \
        | xargs -r docker container rm'

				sh 'docker images -f dangling=true && \
				docker rmi $(docker images -f dangling=true -q)'

				sh 'docker run -d --name client \
				-p 80:80 \
				-p 443:443 \
				-v /home/ubuntu/sslkey/:/var/jenkins_home/workspace/coderun/sslkey/ \
				-v /etc/localtime:/etc/localtime:ro \
				--network coderunnet \
				client:latest'
				sh 'docker run -d --name mainserver \
				-v /etc/localtime:/etc/localtime:ro \
				--network coderunnet mainserver:latest'
				sh 'docker run -d --name mainswagger \
				-p 8000:8000 \
				-v /etc/localtime:/etc/localtime:ro \
				mainserver:latest'
				sh 'docker run -d --name imageswagger \
				-p 8001:8001 \
				-v /etc/localtime:/etc/localtime:ro \
				imageswagger:latest'
				sh 'docker run -d --name videoswagger \
				-p 8002:8002 \
				-v /etc/localtime:/etc/localtime:ro \
				videoswagger:latest'
			}
		}
	}
}