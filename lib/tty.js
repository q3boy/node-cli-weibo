var tty = require('tty');
/*
nA - move the cursor up n rows
nB - move the cursor down n rows
nC - move the cursor right n columns
nD - move the cursor lieft n columns
nJ - clear part of screen (n=0: to end of screen, n=1: beginning of screen, n=2: entire screen)
\x1B[
*/
var esc = '\x1B[';
function S(str){
	this.ordinary = str;
	this.formated = str;
	this.length = this.ordinary.length;
}
S.prototype.repeat = function(num) {
	num = typeof(num) === 'undefined' ? 1 : parseInt(num);
	this.ordinary = new Array(num + 1).join(this.ordinary);
	this.formated = new Array(num + 1).join(this.ordinary);
	return this;
}
S.prototype.black = function(){
	this.formated = esc + '30m' + this.formated + esc + '0m';
	return this;
}
S.prototype.red = function(){
	this.formated = esc + '31m' + this.formated + esc + '0m';
	return this;
}
S.prototype.green = function(){
	this.formated = esc + '32m' + this.formated + esc + '0m';
	return this;
}
S.prototype.yellow = function(){
	this.formated = esc + '33m' + this.formated + esc + '0m';
	return this;
}
S.prototype.blue = function(){
	this.formated = esc + '34m' + this.formated + esc + '0m';
	return this;
}
S.prototype.magenta = function(){
	this.formated = esc + '35m' + this.formated + esc + '0m';
	return this;
}
S.prototype.cyan = function(){
	this.formated = esc + '36m' + this.formated + esc + '0m';
	return this;
}
S.prototype.white = function(){
	this.formated = esc + '37m' + this.formated + esc + '0m';
	return this;
}
S.prototype.bold = function(){
	this.formated = esc + '1m' + this.formated + esc + '0m';
	return this;
}
S.prototype.underline = function(){
	this.formated = esc + '4m' + this.formated + esc + '0m';
	return this;
}
S.prototype.reversed = function(){
	this.formated = esc + '7m' + this.formated + esc + '0m';
	return this;
}
S.prototype.left = function(num) {
	num = typeof(num) === 'undefined' ? 1 : parseInt(num);
	if (num) {
		this.formated = esc + num + 'D' + this.formated ;
	}
	return this;
};
S.prototype.right = function(num) {
	num = typeof(num) === 'undefined' ? 1 : parseInt(num);
	if (num) {
		this.formated = esc + num + 'C' + this.formated ;
	}
	return this;
};
S.prototype.up = function(num) {
	num = typeof(num) === 'undefined' ? 1 : parseInt(num);
	if (num) {
		this.formated = esc + num + 'A' + this.formated ;
	}
	return this;
};
S.prototype.down = function(num) {
	num = typeof(num) === 'undefined' ? 1 : parseInt(num);
	if (num) {
		this.formated = esc + num + 'B' + this.formated ;
	}
	return this;
};
S.prototype.append = function(str) {
	if (str instanceof S) {
		this.ordinary += str.ordinary;
		this.formated += str.formated;
	} else {
		this.ordinary += str;
		this.formated += str;
	}
	this.length = this.ordinary.length;
	return this;
}
S.prototype.prepend = function(str) {
	if (str instanceof S) {
		this.ordinary = str.ordinary + this.ordinary;
		this.formated = str.formated + this.formated;
	} else {
		this.ordinary = str + this.ordinary;
		this.formated = str + this.formated;
	}
	this.length = this.ordinary.length;
	return this;
}
S.prototype.p = function(){
	process.stdout.write(this.formated);
}
S.prototype.toString = function() {
	return this.formated;
}
