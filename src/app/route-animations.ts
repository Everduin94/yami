import {
    trigger,
    transition,
    style,
    query,
    animate,
    group,
} from '@angular/animations';

export const fader =
    trigger('routeAnimations', [
        transition('* <=> *', [
            // Solution for position: Made container a 1x1 grid and explicit set grid row and grid column on items
            query(':enter', [
                style({
                    opacity: 0,

                }),
            ], { optional: true }),

            query(':leave', [
                animate('400ms ease', style({ opacity: 0 }))
              ], {optional: true}),


              query(':enter', [
                animate('400ms ease', style({ opacity: 1 }))
              ], { optional: true })

        ])
    ]);