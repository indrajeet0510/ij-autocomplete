import {Component,OnInit, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
	selector : 'ij-autocomplete',
	templateUrl : './ij-autocomplete.component.html',
	styleUrls : [
  './ij-autocomplete.component.scss'
	]
})

export class IjAutocompleteComponent implements OnInit{

	items : any[]; // @Input
	filteredItems : any[];
	ijSearchTerm : FormControl;
	debounceTimeVal : number; //@Input
	itemsSource : any; //@Input
	bindField : string; //@Input
  maxSuggestions : number = 10; //@Input

  selectedItem : any; // @Output
  selectedFlag : boolean; //

	constructor(private elemRef : ElementRef){
		this.debounceTimeVal = 300;

    this.setInitialSelectedItem();
	}

	setInitialSelectedItem(){
	  //@TODO If any item needs to be selected by default put that logic here and mark selected flag as true
  }

	ngOnInit(){
	  this.testFunction();
    this.ijSearchTerm = new FormControl();
		this.ijSearchTerm.valueChanges
		.debounceTime(this.debounceTimeVal)
		.distinctUntilChanged()
		.switchMap(searchTerm => this.filterSearchResult(searchTerm))
		.subscribe(filteredItems => this.filteredItems = filteredItems);

    this.elemRef.nativeElement.querySelector('input').addEventListener('focus',(event)=> {
      this.filteredItems = this.items.filter((item,index)=>{
        return (index < this.maxSuggestions);
      });
    });

    this.elemRef.nativeElement.addEventListener('keyup',(event)=> {
      console.log('keyup',event);
    });
	}

	selectItem(item:any):void{
	  console.log('selectedItem',item);
    this.selectedItem = item;
    this.selectedFlag = true;
    this.filteredItems = [];
    this.ijSearchTerm.patchValue('');
  }

  clearSelection(){
    this.selectedItem = null;
    this.selectedFlag = false;
    this.filteredItems = this.items.filter((item,index)=>{
      return (index < this.maxSuggestions);
    });
    setTimeout(()=>{
      console.log(this.elemRef.nativeElement.querySelector('input').focus());
      //this.elemRef.nativeElement.querySelector('input').focus();
    });
  }

	filterSearchResult(searchTerm:string):Observable<any>{
		if(this.items && this.items.length && searchTerm){
			return Observable.of(
				this.items.filter((item,index)=>{
					if(this.bindField){
						return (item && item[this.bindField] && item[this.bindField].match(new RegExp(searchTerm, 'gi')) && index < this.maxSuggestions) ? true : false;
					}
					else if(typeof item == 'string'){
						return (item && item.match(new RegExp(searchTerm,'gi'))  && index < this.maxSuggestions) ? true : false;
					}
					else{
						return false;
					}
				})
			);
		}
		else if(typeof this.itemsSource == 'function'){
			return this.itemsSource(searchTerm);
		}
		else{
			// Return No result observable
			return Observable.of([]);
		}
	}

	testFunction(){
//	  this.items = ["Airport Terminals","Houses of Architects","Art Galleries","Bank Buildings","Bridges Castles","Cathedrals","Churches","Commercial Buildings","Exhibition and Exposition","Factories","Gardens","Government Buildings","City Halls","Hotels","Houses"," Large & Small","Large Houses","Small Houses","Landscapes","Libraries","Monasteries","Mosques","Multi-Family Housing","Museums","Offices","Parks","Palaces","Plazas and Piazzas","School and Academic","Skyscrapers","Temples","Theaters"," Town and City","Villas","Coffee Shops","Apartments"];
    this.bindField = "name";

    let items = [
        {
          "name": "Alabama",
          "abbreviation": "AL"
        },
        {
          "name": "Alaska",
          "abbreviation": "AK"
        },
        {
          "name": "American Samoa",
          "abbreviation": "AS"
        },
        {
          "name": "Arizona",
          "abbreviation": "AZ"
        },
        {
          "name": "Arkansas",
          "abbreviation": "AR"
        },
        {
          "name": "California",
          "abbreviation": "CA"
        },
        {
          "name": "Colorado",
          "abbreviation": "CO"
        },
        {
          "name": "Connecticut",
          "abbreviation": "CT"
        },
        {
          "name": "Delaware",
          "abbreviation": "DE"
        },
        {
          "name": "District Of Columbia",
          "abbreviation": "DC"
        },
        {
          "name": "Federated States Of Micronesia",
          "abbreviation": "FM"
        },
        {
          "name": "Florida",
          "abbreviation": "FL"
        },
        {
          "name": "Georgia",
          "abbreviation": "GA"
        },
        {
          "name": "Guam",
          "abbreviation": "GU"
        },
        {
          "name": "Hawaii",
          "abbreviation": "HI"
        },
        {
          "name": "Idaho",
          "abbreviation": "ID"
        },
        {
          "name": "Illinois",
          "abbreviation": "IL"
        },
        {
          "name": "Indiana",
          "abbreviation": "IN"
        },
        {
          "name": "Iowa",
          "abbreviation": "IA"
        },
        {
          "name": "Kansas",
          "abbreviation": "KS"
        },
        {
          "name": "Kentucky",
          "abbreviation": "KY"
        },
        {
          "name": "Louisiana",
          "abbreviation": "LA"
        },
        {
          "name": "Maine",
          "abbreviation": "ME"
        },
        {
          "name": "Marshall Islands",
          "abbreviation": "MH"
        },
        {
          "name": "Maryland",
          "abbreviation": "MD"
        },
        {
          "name": "Massachusetts",
          "abbreviation": "MA"
        },
        {
          "name": "Michigan",
          "abbreviation": "MI"
        },
        {
          "name": "Minnesota",
          "abbreviation": "MN"
        },
        {
          "name": "Mississippi",
          "abbreviation": "MS"
        },
        {
          "name": "Missouri",
          "abbreviation": "MO"
        },
        {
          "name": "Montana",
          "abbreviation": "MT"
        },
        {
          "name": "Nebraska",
          "abbreviation": "NE"
        },
        {
          "name": "Nevada",
          "abbreviation": "NV"
        },
        {
          "name": "New Hampshire",
          "abbreviation": "NH"
        },
        {
          "name": "New Jersey",
          "abbreviation": "NJ"
        },
        {
          "name": "New Mexico",
          "abbreviation": "NM"
        },
        {
          "name": "New York",
          "abbreviation": "NY"
        },
        {
          "name": "North Carolina",
          "abbreviation": "NC"
        },
        {
          "name": "North Dakota",
          "abbreviation": "ND"
        },
        {
          "name": "Northern Mariana Islands",
          "abbreviation": "MP"
        },
        {
          "name": "Ohio",
          "abbreviation": "OH"
        },
        {
          "name": "Oklahoma",
          "abbreviation": "OK"
        },
        {
          "name": "Oregon",
          "abbreviation": "OR"
        },
        {
          "name": "Palau",
          "abbreviation": "PW"
        },
        {
          "name": "Pennsylvania",
          "abbreviation": "PA"
        },
        {
          "name": "Puerto Rico",
          "abbreviation": "PR"
        },
        {
          "name": "Rhode Island",
          "abbreviation": "RI"
        },
        {
          "name": "South Carolina",
          "abbreviation": "SC"
        },
        {
          "name": "South Dakota",
          "abbreviation": "SD"
        },
        {
          "name": "Tennessee",
          "abbreviation": "TN"
        },
        {
          "name": "Texas",
          "abbreviation": "TX"
        },
        {
          "name": "Utah",
          "abbreviation": "UT"
        },
        {
          "name": "Vermont",
          "abbreviation": "VT"
        },
        {
          "name": "Virgin Islands",
          "abbreviation": "VI"
        },
        {
          "name": "Virginia",
          "abbreviation": "VA"
        },
        {
          "name": "Washington",
          "abbreviation": "WA"
        },
        {
          "name": "West Virginia",
          "abbreviation": "WV"
        },
        {
          "name": "Wisconsin",
          "abbreviation": "WI"
        },
        {
          "name": "Wyoming",
          "abbreviation": "WY"
        }
      ];

    let i = 0;
    this.items = items.map((item)=>{
      i+= 1;
      return Object.assign({_id : i},item);
    });
  }

}
