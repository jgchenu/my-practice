import 'dart:async';

void main(){
  print('flow start');
  Timer.run(() {
    print('event');
  });
  scheduleMicrotask((){
    print('microtask');
  });
  print('flow end');
}