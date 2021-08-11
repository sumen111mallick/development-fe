import { TestimonialsComponent } from './testimonials/testimonials.component';
import { AdminloanComponent } from './adminloan/adminloan.component';
import { LoancalcComponent } from './loancalc/loancalc.component';
import { AllusersComponent } from './allusers/allusers.component';
import { UsercreatorComponent } from './usercreator/usercreator.component';
import { EditproductrentComponent } from './editproductrent/editproductrent.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { AdminlawyerservicesComponent } from './adminlawyerservices/adminlawyerservices.component';
import { LawyerprofileComponent } from './lawyerprofile/lawyerprofile.component';
import { LawyerpageComponent } from './lawyerpage/lawyerpage.component';
import { LawyerserviceComponent } from './lawyerservice/lawyerservice.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AdmingetreviewsComponent } from './admingetreviews/admingetreviews.component';
import { AdmingetrequirementsComponent } from './admingetrequirements/admingetrequirements.component';
import { AdmingetproductComponent } from './admingetproduct/admingetproduct.component';
import { AdmingetusersComponent } from './admingetusers/admingetusers.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { InsertselectorComponent } from './insertselector/insertselector.component';
import { PostproductrentComponent } from './postproductrent/postproductrent.component';
import { MypropertiesComponent } from './myproperties/myproperties.component';
import { SavedsearchesComponent } from './savedsearches/savedsearches.component';
import { BoardAgentComponent } from './board-agent/board-agent.component';
import { SearchComponent } from './search/search.component';
import { CompareComponent } from './compare/compare.component';
import { RequirementComponent } from './requirement/requirement.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { PostproductComponent } from './postproduct/postproduct.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { UserlogoutComponent } from './userlogout/userlogout.component';
import { UserregisterComponent } from './userregister/userregister.component';
import { ProfileComponent } from './profile/profile.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { BlogComponent } from './blog/blog.component';
import { BlogCreatePostComponent } from './blog-create-post/blog-create-post.component';
import { BlogSinglePostComponent } from './blog-single-post/blog-single-post.component';
import { AdminBlogComponent } from './admin-blog/admin-blog.component';
import { AdminBlogSinglePostComponent } from './admin-blog-single-post/admin-blog-single-post.component';
import { PostsGuard } from './posts.guard';
import { RegisterComponent } from './register/register.component';
import { VerifyGuard } from './verify.guard';
import { VerifyDetailsComponent } from './verify-details/verify-details.component';
import { UpdatepropertyComponent } from './updateproperty/updateproperty.component';
import { EmiCalculatorComponent } from './emi-calculator/emi-calculator.component';
import { SubscriptionPlansComponent } from './subscription-plans/subscription-plans.component';
import { IpDisclaimerComponent } from './ip-disclaimer/ip-disclaimer.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { VerifyDetailsGuard } from './verify-details.guard';
import { VerifyGuardGuard } from './verify-guard.guard';
import { UpdateSalesPropertyComponent } from './update-sales-property/update-sales-property.component';

const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [VerifyGuard]},
  {path: 'productlisting', component: ProductListingComponent},
  {path: 'productpage/:id', component: ProductpageComponent},
  //{path: 'register', component: UserregisterComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [VerifyGuard]},
  {path: 'logout', component: UserlogoutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'insertproductsale', component: PostproductComponent, canActivate: [VerifyDetailsGuard]},
  {path: 'insertproductrent', component: PostproductrentComponent, canActivate: [VerifyDetailsGuard]},
  {path: 'search', component: SearchComponent},
  //{path: 'agentregister', component: BoardAgentComponent},
  {path: 'agentregister', component: RegisterComponent},
  {path: 'insertproduct', component: InsertselectorComponent, canActivate: [VerifyGuard]},
  {path: 'requirement', component: RequirementComponent},
  {path: 'myproperties', component: MypropertiesComponent},
  {path: 'compare', component: CompareComponent},
  {path: 'login', component: UserloginComponent},
  {path: 'savedsearches', component: SavedsearchesComponent},
  {path: 'reviews', component: ReviewsComponent},
  {path: 'admin', component: BoardAdminComponent},
  {path: 'adminpanel', component: AdminpanelComponent, canActivate: [VerifyGuard]},
  {path: 'editproduct', component: EditproductComponent},
  {path: 'editproductrent', component: EditproductrentComponent},
  {path: 'adminusers', component: AdmingetusersComponent},
  {path: 'adminproducts', component: AdmingetproductComponent},
  {path: 'adminrequirements', component: AdmingetrequirementsComponent},
  {path: 'adminreviews', component: AdmingetreviewsComponent},
  {path: 'usercreator', component: UsercreatorComponent},
  {path: 'lawyerservice', component: LawyerserviceComponent},
  {path: 'lawyers', component: LawyerpageComponent},
  {path: 'lawyerprofile', component: LawyerprofileComponent},
  {path: 'adminlawyerservices', component: AdminlawyerservicesComponent},
  {path: 'allusers', component: AllusersComponent},
  {path: 'loancalc', component: LoancalcComponent},
  {path: 'adminloan', component: AdminloanComponent},
  {path: 'testimonials', component: TestimonialsComponent},
  {path: 'Wishlist', component: WishlistComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'blog-create-post', component: BlogCreatePostComponent, canActivate: [PostsGuard]},
  {path: 'blog-single-post/:slug', component: BlogSinglePostComponent},
  {path: 'blog-edit-post/:slug', component: BlogCreatePostComponent},
  //{path:'blog-edit-post/:slug', component: BlogEditPostComponent},
  //{path: 'blog-single-post', component: BlogSinglePostComponent},
  {path: 'admin-blog', component: AdminBlogComponent, canActivate: [PostsGuard]},
  {path: 'admin-blog-single-post/:slug', component: AdminBlogSinglePostComponent},
  {path: 'verify-details', component:  VerifyDetailsComponent, canActivate: [VerifyGuardGuard]},
  {path: 'emi-calculator', component: EmiCalculatorComponent},
  {path: 'plans', component: SubscriptionPlansComponent},
  {path: 'intellectual-property-disclaimer', component: IpDisclaimerComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'terms-conditions', component: TermsConditionsComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'UdateProperty/:id', component: UpdatepropertyComponent},
  {path: 'UdateSalesProperty/:id', component: UpdateSalesPropertyComponent},
  {path: '**', component: NotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
