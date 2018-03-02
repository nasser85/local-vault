export class DbDebugger {
	constructor(classType, name) {
		this.classType = classType;
		this.name = name.toUpperCase();
	}

	log(httpMethod, classMethod, payload, status, error) {
		httpMethod = httpMethod.toLowerCase();
		if (httpMethod == 'post') {
			this.logPost(classMethod, payload, status, error);
		} else if (httpMethod == 'put') {
			this.logPut(classMethod, payload, status, error)
		} else if (httpMethod == 'get') {
			this.logGet(classMethod, payload, status, error)
		} else if (httpMethod == 'delete') {
			this.logDelete(classMethod, payload, status, error)
		} else {
			this.logGeneral(classMethod, payload, status, error)
		}
	}
	
	logPost(classMethod, payload, status, error) {
		if (status == 'success') {
			console.log("%cPOST @ %c" + classMethod + "() %c=> ", "color: green; font-size: 12px;", "color: purple; font-size: 12px;", "color: green; font-size: 12px;", payload, '\nto ' + this.classType + ' ' + this.name)
		} else {
			console.log("%c !FAILED %c POST @ %" + classMethod + "() %c=> ", "background-color: red; color: white; font-size: 12px;", "color: green; font-size: 12px;", "color: purple; font-size: 12px;", "color: green; font-size: 12px;", payload, '\nto ' + this.classType + ' ' + this.name + '\n' + error)
		}
	}

	logPut(classMethod, payload, status, error) {
		if (status == 'success') {
			console.log("%cPUT @ %c" + classMethod + "() %c=> ", "color: blue; font-size: 12px;", "color: purple; font-size: 12px;", "color: blue; font-size: 12px;", payload, '\nto ' + this.classType + ' ' + this.name)
		} else {
			console.log("%c !FAILED %c PUT @ %" + classMethod + "() %c=> ", "background-color: red; color: white; font-size: 12px;", "color: blue; font-size: 12px;", "color: purple; font-size: 12px;", "color: blue; font-size: 12px;", payload, '\nto ' + this.classType + ' ' + this.name + '\n' + error)
		}
	}

	logGet(classMethod, payload, status, error) {
		if (status == 'success') {
			console.log("%cGET @ %c" + classMethod + "() %c=> ", "color: orange; font-size: 12px;", "color: purple; font-size: 12px;", "color: orange; font-size: 12px;", payload, '\nfrom ' + this.classType + ' ' + this.name)
		} else {
			console.log("%c !FAILED %c GET @ %" + classMethod + "() %c=> ", "background-color: red; color: white; font-size: 12px;", "color: orange; font-size: 12px;", "color: purple; font-size: 12px;", "color: orange; font-size: 12px;", payload, '\nfrom ' + this.classType + ' ' + this.name + '\n' + error)
		}
	}

	logDelete(classMethod, payload, status, error) {
		if (status == 'success') {
			console.log("%cDELETE @ %c" + classMethod + "() %c=> ", "color: red; font-size: 12px;", "color: purple; font-size: 12px;", "color: red; font-size: 12px;", payload, '\nfrom ' + this.classType + ' ' + this.name)
		} else {
			console.log("%c !FAILED %c DELETE @ %" + classMethod + "() %c=> ", "background-color: red; color: white; font-size: 12px;", "color: red; font-size: 12px;", "color: purple; font-size: 12px;", "color: red; font-size: 12px;", payload, '\nfrom ' + this.classType + ' ' + this.name + '\n' + error)
		}
	}

	logGeneral(classMethod, payload, status, error) {

	}




}