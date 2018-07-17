import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {SubscriberService} from '../../services/subscriber.service';
import {S3Service} from '../../services/s3.service';
import {ProjectService} from '../../services/project.service';
import { Meta } from '@angular/platform-browser';
import { ɵgetDOM } from '@angular/platform-browser';
import {Globals} from '../../../globals';
import {Project} from '../../models/project';


@Component({
  selector: 'app-form-kyc',
  templateUrl: './form-kyc.component.html',
  styleUrls: ['./form-kyc.component.scss']
})
export class FormKycComponent implements OnInit {

  udid: any;
  message: any;
  createCustomer: FormGroup;
  loading: boolean;
  imagePath: string;
  imagePath2: string;
  receivedData: Array<any> = [];
  selectedTypeDocument: any;
  selectedCountry: any;
  selectedState: any;
  extensionFile: any;
  extensionFile2: any;
  amountContribute: any;
  project: any;
  startDate: any;
  loadingStart: boolean;
  fingerprint: any;
  awsAccessKeyId: string;
  awsAccessKeyId2: string;
  referr: string = '';
  agreed: boolean = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private subscriberService: SubscriberService,
    private s3Service: S3Service,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private meta: Meta,
    private globals: Globals,
    private router: Router,
  ) {

  }

  ngOnInit() {

    this.project = this.globals.getProject();
    this.udid = this.globals.apiToken;
    this.startDate = new Date();
    this.loading = false;
    this.loadingStart = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      if (this.activatedRoute.snapshot.queryParams['code']) {
        this.referr = this.activatedRoute.snapshot.queryParams['code'];
      }
    });

    this.selectedTypeDocument =  null;
    this.selectedCountry =  '';
    this.selectedState =  '';
    this.amountContribute =  '0';
    this.awsAccessKeyId = null;

    this.createCustomer = this.formBuilder.group({
      firstname: [null, [Validators.required, Validators.minLength(4)]],
      lastname: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required]],
      dateBirth: [null],
      typeAddress: [null, [Validators.required, Validators.minLength(4)]],
      publicAddress: [null, [Validators.required, Validators.minLength(4)]],
      billingAddress: [null, [Validators.required, Validators.minLength(4)]],
      typeDocument: [null, [Validators.required]],
      contribute: [null, [Validators.required]],
      country: [null, [Validators.required]],
      state: [null],
    });
  }

  create(form: FormGroup) {
    if (!this.agreed) {
      this.message = {
        type: 'danger',
        message: 'You must accept the terms.'
      };
      return;
    }
    this.loading = true;
    // const fingerprint = JSON.stringify(window['fingerprint'].json);
    const fingerprint = window['fingerprint'];
    const date = new Date(form.value.dateBirth);
    const dateBirth = date.getTime();
    const customer = {
      firstName: form.value.firstname,
      lastName: form.value.lastname,
      email: form.value.email,
      birthdate: dateBirth,
      publicAddress: form.value.publicAddress,
      typeAddress: form.value.typeAddress,
      billingAddress: form.value.billingAddress,
      documentType: form.value.typeDocument,
      contribution: form.value.contribute,
      awsAccessKeyId: this.awsAccessKeyId,
      awsAccessKeyId2: this.awsAccessKeyId2,
      country: this.selectedCountry,
      state: this.selectedState,
      extensionFile: this.extensionFile,
      extensionFile2: this.extensionFile2,
      fingerprint: fingerprint,
      apiToken: this.udid,
      referr: this.referr
    };

    this.subscriberService.create(customer).subscribe(
      data => {
        if (data['error']) {
          this.loading = false;

          this.message = {
            type: 'danger',
            message: data['message']
          };
        }else {
          this.loading = false;

          this.message = {
            type: 'success',
            message: 'The information has been submitted succesfully. You will receive an email to confirm your identity and continue with the process'
          };

          this.router.navigateByUrl('/thanks-page');


        }
      }, err => {
        this.loading = false;

        this.message = {
          type: 'danger',
          message: err.error.message
        };
      }
    );
  }

  uploadImg(event) {
    const file = event.srcElement.files[0];
    if (this.validateFile(file)) {
      this.s3Service.upload(file).then((x) => {
        this.readUrl(file);
        this.awsAccessKeyId = x.awsAccessKeyId;
      });
    }
  }

  uploadImg2(event) {
    const file = event.srcElement.files[0];
    if (this.validateFile(file)) {
      this.s3Service.upload(file).then((x) => {
        this.readUrl2(file);
        this.awsAccessKeyId2 = x.awsAccessKeyId;
      });
    }
  }

  readUrl(file) {
    this.extensionFile = file.name.split('.').pop();
    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.imagePath = event.target.result;
    };

    reader.readAsDataURL(file);
  }

  readUrl2(file) {
    this.extensionFile2 = file.name.split('.').pop();
    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.imagePath2 = event.target.result;
    };

    reader.readAsDataURL(file);
  }

  validateFile(file) {
    const fileSize = file.size / 1000;
    if (fileSize >= 400 && fileSize <= 4000) {
      return true;
    } else {
      this.message = {
        type: 'danger',
        message: 'The file uploaded does not meet the correct size, please upload a file that is between 400 KB and 4 MB'
      };
      return false;
    }
  }


  transferDataSuccess($event: any) {

    const dataTransfer: DataTransfer = $event.mouseEvent.dataTransfer;
    if (dataTransfer && dataTransfer.files) {
      const files: FileList = dataTransfer.files;
      const file: File = files[0];
      if (this.validateFile(file)) {
         this.s3Service.upload(file).then((x) => {
           this.readUrl(file);
           this.awsAccessKeyId = x.awsAccessKeyId;
         });
      }
    }

    this.receivedData.push($event);
  }

  transferDataSuccess2($event: any) {

    const dataTransfer: DataTransfer = $event.mouseEvent.dataTransfer;
    if (dataTransfer && dataTransfer.files) {
      const files: FileList = dataTransfer.files;
      const file: File = files[0];
      if (this.validateFile(file)) {
        this.s3Service.upload(file).then((x) => {
          this.readUrl2(file);
          this.awsAccessKeyId2 = x.awsAccessKeyId;
        });
      }
    }

    this.receivedData.push($event);
  }

  changeTypeDocument(selected: any) {
  }

  goToLink(link): void {
    const re = new RegExp('^(http|https)://', 'i');
    const prefix = re.test(link) ?  '' : '//';
    window.open(prefix + link, '_blank');
  }

  onlyNumberKey(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }
}
