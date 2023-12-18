import { Injectable } from '@nestjs/common';
import { ElementsService } from 'src/elements/elements.service';
import { StudiesService } from 'src/studies/studies.service';
import { initialElementData, initialStudyData } from './data/seed-data';
@Injectable()
export class SeedService {

  constructor(
    private readonly elementsService: ElementsService,
    private readonly studiesService: StudiesService
  ) {}
  async runSeed() {
    await this.insertNewServices();
    return 'Seed executed';
  }

  private async insertNewServices(){
    await this.elementsService.deleteAllElements();
    await this.studiesService.deleteAllStudies();

    const elements = initialElementData;
    const studies = initialStudyData;

    const insertPromises = []

    elements.forEach( element => insertPromises.push(this.elementsService.create(element)))
    studies.forEach( study => insertPromises.push(this.studiesService.create(study)))

    await Promise.all(insertPromises);
    
    return true;
  }
}
