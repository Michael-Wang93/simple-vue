const readline = require('readline');
const chalk = require('chalk');
const fs = require('fs');
const exec = require('child_process').exec;


const getUserInput = (inputInfo) => {
    const readLineIns = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, reject) => {
        readLineIns.question(inputInfo, answer => {
            readLineIns.close();
            resolve(answer);
            console.log(chalk.green(answer));
        })
    })
}

const getDirNameList = (path) => {
    let allDirNameList = fs.readdirSync(path);
    let dirList = [];
    allDirNameList.forEach(item => {
        if(fs.statSync(item).isDirectory()) {
            dirList.push(item);
        }
    });
    return dirList;
}

const generalPackJsonFile = (projectName) => {
    const packageJson = JSON.stringify({
        "name": "michael"
    });
    fs.writeFileSync(`./${projectName}/package.json`, packageJson);
}

const createProject = () => {
    getUserInput('请输入项目名称: ').then(answer => {
        const dirList = getDirNameList('./');
        if(dirList.includes(answer)) {
            console.log(chalk.green('项目已经存在！'))
        } else {
            exec(`mkdir ${answer}`, () => {
                generalPackJsonFile(answer);
                console.log(chalk.green('项目已经初始化完毕！'))
            })
            
        }
    });
    
}

createProject();