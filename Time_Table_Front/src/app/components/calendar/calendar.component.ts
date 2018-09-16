import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, OnInit
} from '@angular/core';
// @ts-ignore
// @ts-ignore
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import * as moment from 'moment';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import {SeanceService} from '../../services/seance.service';
import {Seance} from '../../models/seance';
import {Observable} from 'rxjs/Observable';
import {forEach} from '@angular/router/src/utils/collection';
import {FormControl, FormGroup} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {SalleService} from '../../services/salle.service';
import {Salle} from '../../models/salle';
import {DisponibiliteService} from '../../services/disponibilite.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;


  view: string = 'month';
  public seances;
  public salles;
  clickedBtn: Boolean =false;
  seance: Seance = new Seance();
  salle=new Salle();

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  ngOnInit(): void {
    this.fillSeances();
    this.getSeances();
    //this.fillSalles();
  }

  addDisponibilite(seance){
    seance.dateDebut=String(moment(seance.dateDebut).valueOf());
    seance.dateFin=String(moment(seance.dateFin).valueOf());
    console.log(seance.dateDebut);
    this.disponibiliteService.createDisponibilite(seance).subscribe(
      date =>{
        console.log("OK !");
        this.getSeances();
        return true;
      }, error1 => {
        return Observable.throw(error1);

      }
    );
  }

  fillSallesDispo(dateDebut, dateFin) {
    dateDebut=String(moment(dateDebut).format('YYYY-MM-DD HH:mm:ss'));
    dateFin=String(moment(dateFin).format('YYYY-MM-DD HH:mm:ss'));
    this.salleService.getSallesDispo(dateDebut, dateFin).subscribe(
      data => {
        this.salles = data;
        console.log(this.salles);
      }
    );

  }
  testClicked(){
    this.clickedBtn=! this.clickedBtn;
  }

  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);

  myForm = new FormGroup({
    myDateYMD: new FormControl(new Date()),
    myDateFull: new FormControl(new Date()),
    myDateMDY: new FormControl(new Date())
  });

  private getRandomColor(colors) {
    let randomIndex = Math.floor((Math.random() * colors.length));
    return colors[randomIndex];
  }

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
        console.log('edited');
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
        console.log('deleted');
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private seanceService: SeanceService, private salleService: SalleService, private disponibiliteService: DisponibiliteService) {
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    // console.log('here my friend');
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
  }

  fillSeances() {
    this.events = [];
    this.seanceService.getSeances().subscribe(
      data => {
        for (let seance of JSON.parse(JSON.stringify(data))) {
          this.events.push({
            id: seance.id,
            start: new Date(seance.dateDebut),
            end: new Date(seance.dateFin),
            title: seance.name,
            color: this.getRandomColor(colors),
          });
        }

      },
      error1 => Observable.throw(error1),
      () => console.log('seances loaded fillSeances')
    );
  }

  getSeances() {
    this.seances = [];
    this.seanceService.getSeances().subscribe(
      data => {
        console.log(data === JSON.parse(JSON.stringify(data)));
        for (let seance of JSON.parse(JSON.stringify(data))) {
          var x = new Seance();
          x.id = seance.id;
          x.name = seance.name;
          x.dateDebut = moment(seance.dateDebut).format('YYYY-MM-DDTHH:mm');
          x.dateFin = moment(seance.dateFin).format('YYYY-MM-DDTHH:mm');
          x.salle=seance.salle;
          this.seances.push(x);
        }
      },
      error1 => Observable.throw(error1),
      () => console.log('seances loaded')
    );
  }

  addEvent(): void {
    var x = new Seance();
    x.name = 'new event';
    this.seanceService.createSeance(x).subscribe(
      data => {
        this.getSeances();
        return true;
      }, error1 => {
        return Observable.throw(error1),
          () => console.log('seance added');
      }
    );
    this.events.push({
      title: x.name,
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
    });
    this.refresh.next();
  }

  updateSeance(seance) {
    let seanceToBeUpdated = new Seance();
    seanceToBeUpdated.id = seance.id;
    seanceToBeUpdated.name = seance.name;
    seanceToBeUpdated.dateDebut = String(moment(seance.dateDebut).valueOf());
    seanceToBeUpdated.dateFin = String(moment(seance.dateFin).valueOf());
    seanceToBeUpdated.salle=seance.salle;
    for (let event of this.events) {
      if (event.id === seance.id) {
        console.log('true');
        event.title=seance.name;
        event.start=new Date(seance.dateDebut);
        event.end=new Date(seance.dateFin);
        event.color= this.getRandomColor(colors);
        let index=this.events.indexOf(this.events.find(test=>test.id===seance.id));
        this.events[index] = event;
        this.refresh.next();
      }
    }
    this.seanceService.updateSeance(seanceToBeUpdated).subscribe(
      data => {
        console.log('seance updated');
        this.fillSeances();
        console.log(seanceToBeUpdated);
        return true;
      }, error1 => {
        return Observable.throw(error1);
      },
      () => console.log('seance ' + seance.name + ' updated')
    );
    this.refresh.next();
  }

  deleteSeance(seance) {
    this.seanceService.deleteSeance(seance.id).subscribe(
      data => {
        this.fillSeances();
        this.getSeances();
        return true;
      }, error1 => {
        return Observable.throw(error1);
      },
      () => console.log('seance ' + seance.name + ' deleted')
    );
  }

  findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  showUpdatedItem(newItem) {
    let updateItem = this.events.find(this.findIndexToUpdate, newItem.id);
    let index = this.events.indexOf(updateItem);
    this.events[index] = newItem;
  }

  /*fillSalles() {
    this.salleService.getSalles().subscribe(
      data => {
        this.salles = data;
        return true;
      }, error1 => {
        return Observable.throw(error1);
      }
    );
  }*/


}
