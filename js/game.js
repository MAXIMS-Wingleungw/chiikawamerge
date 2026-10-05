"use strict";
(function(global){
const SIZE=4, MAX_LEVEL=11;
function blank(){return Array.from({length:SIZE},()=>Array(SIZE).fill(0));}
function cloneBoard(b){return b.map(r=>r.slice());}
function mergeLine(line){const vals=line.filter(Boolean), out=[], merged=[];let gained=0;for(let i=0;i<vals.length;i++){if(i+1<vals.length&&vals[i]===vals[i+1]){const n=Math.min(MAX_LEVEL,vals[i]+1);out.push(n);gained+=2**n;merged.push(out.length-1);i++;}else out.push(vals[i]);}while(out.length<SIZE)out.push(0);return{line:out,gained,merged};}
function transpose(b){return b[0].map((_,c)=>b.map(r=>r[c]));}
function reverseRows(b){return b.map(r=>r.slice().reverse());}
function boardsEqual(a,b){return a.every((r,i)=>r.every((v,j)=>v===b[i][j]));}
class Game{
 constructor(data){this.board=data?.board?cloneBoard(data.board):blank();this.score=data?.score||0;this.best=data?.best||data?.best_score||0;this.moves=data?.moves||0;this.highest=data?.highest||data?.highest_level||1;this.previous=null;if(!data?.board){this.add();this.add();}}
 emptyCells(){const a=[];this.board.forEach((r,y)=>r.forEach((v,x)=>{if(!v)a.push([y,x]);}));return a;}
 add(){const e=this.emptyCells();if(!e.length)return null;const [y,x]=e[Math.floor(Math.random()*e.length)];this.board[y][x]=Math.random()<.9?1:2;return[y,x];}
 move(direction){const old=cloneBoard(this.board);this.previous={board:old,score:this.score,moves:this.moves,highest:this.highest};let working=cloneBoard(this.board), vertical=direction==='up'||direction==='down', reverse=direction==='right'||direction==='down';if(vertical)working=transpose(working);if(reverse)working=reverseRows(working);let gained=0;working=working.map(row=>{const r=mergeLine(row);gained+=r.gained;return r.line;});if(reverse)working=reverseRows(working);if(vertical)working=transpose(working);if(boardsEqual(old,working)){this.previous=null;return{changed:false,gained:0,added:null};}this.board=working;this.score+=gained;this.best=Math.max(this.best,this.score);this.moves++;this.highest=Math.max(this.highest,...this.board.flat());const added=this.add();return{changed:true,gained,added};}
 undo(){if(!this.previous)return false;Object.assign(this,{board:cloneBoard(this.previous.board),score:this.previous.score,moves:this.previous.moves,highest:this.previous.highest});this.previous=null;return true;}
 canMove(){if(this.emptyCells().length)return true;for(let y=0;y<SIZE;y++)for(let x=0;x<SIZE;x++)if((x<SIZE-1&&this.board[y][x]===this.board[y][x+1])||(y<SIZE-1&&this.board[y][x]===this.board[y+1][x]))return true;return false;}
 data(){return{version:3,board:cloneBoard(this.board),score:this.score,best:this.best,moves:this.moves,highest:this.highest};}
}
global.CozyGame={Game,mergeLine,boardsEqual,MAX_LEVEL};
})(typeof window==='undefined'?globalThis:window);