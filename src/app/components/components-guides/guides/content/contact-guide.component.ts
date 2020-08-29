import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-guide',
  template: `

  <h1>Contact Me</h1>
  
  <h3>Suggestions | Comments | Questions | Bugs</h3>

  <div>Email: <a href="mailto:everduin.yami@gmail.com"><strong>everduin.yami@gmail.com</strong></a></div>
  
  <div>Twitter: <a href="https://twitter.com/ErxkVerduin" target="_blank"><strong>Erxk</strong></a></div>

  <hr>

  <div>If the issue is a bug or some feature is not working as expected.</div>
  <div>Please include a screenshot, the browser you are using, and a description of the problem</div>

  `,
  styleUrls: ['./content.css']
})
export class ContactGuideComponent {
  

}