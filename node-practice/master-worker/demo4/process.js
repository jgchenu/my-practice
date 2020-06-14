process.on('SIGTERM', function() {
  console.log('Got a SIGTERM, exiting...');
  process.exit(1);
});
console.log('server running with pid', process.pid);
process.kill(process.pid, 'SIGTERM');
/**
 * kill -l;
HUP INT QUIT ILL TRAP ABRT EMT FPE KILL BUS SEGV 
SYS PIPE ALRM TERM URG STOP TSTP CONT CHLD TTIN 
TTOU IO XCPU XFSZ VTALRM PROF WINCH INFO USR1 USR2
 */
