import { Signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { debounceTime } from "rxjs";


//FOUND AT: https://stackoverflow.com/questions/76597307/angular-signals-debounce-in-effect

//Usage of observable is prefered to pure signals due to better readability
export function debouncedSignal<T>(
    sourceSignal: Signal<T>,
    debounceTimeInMs = 0,
  ): Signal<T> {
    const source$ = toObservable(sourceSignal);
    const debounced$ = source$.pipe(debounceTime(debounceTimeInMs));
    return toSignal(debounced$, {
      initialValue: sourceSignal(),
    });
  }