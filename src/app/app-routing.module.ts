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
import { AuthGuardGuard } from './auth-guard.guard';
import { AdminUsercreatorComponent } from './admin-usercreator/admin-usercreator.component';
import { InternalUsersPanelComponent } from './internal-users-panel/internal-users-panel.component';
import { CreateRolesComponent } from './create-roles/create-roles.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { ViewRolesComponent } from './view-roles/view-roles.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { CheckLoginGuard } from './check-login.guard';
import { UserLoggsGuard } from './user-loggs.guard';
import { InsertproductSaleComponent } from './insertproduct-sale/insertproduct-sale.component';
import { InsertproductRentComponent } from './insertproduct-rent/insertproduct-rent.component';
// import { MobileVerifyGuard } from './mobile-verify.guard';
import{ LocalserviceComponent } from './localservice/localservice.component';

const routes: Routes = [

  {path: '', component: HomeComponent, canActivate:  [UserLoggsGuard],
    data: {
      type: 'home_page'
    }
  },
  {path: 'home', component: HomeComponent, canActivate:  [UserLoggsGuard],
    data: {
      type: 'home_page'
    }
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [CheckLoginGuard],
    data: {
      permission: ['dashboard']
    }
  },
  {path: 'productlisting', component: ProductListingComponent, canActivate:  [UserLoggsGuard],
    data: {
      type: 'product_listing'
    }
  },
  {path: 'productpage', component: ProductpageComponent, canActivate:  [UserLoggsGuard],
    data: {
      type: 'single_property_page'
    }
  },
  //{path: 'register', component: UserregisterComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'profile', component: ProfileComponent, canActivate: [CheckLoginGuard],
    data: {
      permission: ['profile']
    }
  },
  {path: 'logout', component: UserlogoutComponent},
  {path: 'contact', component: ContactComponent, canActivate:  [UserLoggsGuard],
  data: {
    type: 'contact_page'
  }},
  //{path: 'insertproductsale', component: PostproductComponent, canActivate: [VerifyDetailsGuard]},
  //{path: 'insertproductrent', component: PostproductrentComponent, canActivate: [VerifyDetailsGuard]},
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
  {
    path: 'adminpanel', component: AdminpanelComponent, canActivate: [CheckLoginGuard],
    data: {
      permission: ['adminpanel']
    }
  },
  {path: 'editproduct', component: EditproductComponent},
  {path: 'editproductrent', component: EditproductrentComponent},
  {
    path: 'adminusers', component: AdmingetusersComponent, canActivate: [AuthGuardGuard],
    data: {
      permission: ['access_all_users']
    }
  },
  {
    path: 'adminproducts', component: AdmingetproductComponent, canActivate: [AuthGuardGuard],
    data: {
      permission: ['access_properties']
    }
  },
  {path: 'adminrequirements', component: AdmingetrequirementsComponent},
  {
    path: 'adminreviews', component: AdmingetreviewsComponent, canActivate: [AuthGuardGuard],
    data: {
      permission: ['access_reviews']
    }
  },
  {path: 'usercreator', component: UsercreatorComponent},
  {path: 'lawyerservice', component: LawyerserviceComponent},
  {path: 'lawyers', component: LawyerpageComponent},
  {path: 'lawyerprofile', component: LawyerprofileComponent},
  {
    path: 'adminlawyerservices', component: AdminlawyerservicesComponent, canActivate: [AuthGuardGuard],
    data: {
      permission: ['access_lawyer_services']
    }
  },
  {path: 'allusers', component: AllusersComponent},
  {path: 'loancalc', component: LoancalcComponent},
  {
    path: 'adminloan', component: AdminloanComponent, canActivate: [AuthGuardGuard],
    data: {
      permission: ['access_loan_control']
    }
  },
  {path: 'testimonials', component: TestimonialsComponent},
  {path: 'Wishlist', component: WishlistComponent},
  {path: 'blog', component: BlogComponent},
  {
    path: 'blog-create-post', component: BlogCreatePostComponent, canActivate: [AuthGuardGuard],
    data: {
      permission: ['access_manage_blog']
    }
  },
  {path: 'blog-single-post/:slug', component: BlogSinglePostComponent},
 {
    path: 'blog-edit-post/:slug', component: BlogCreatePostComponent, canActivate: [AuthGuardGuard],
    data: {
      permission: ['access_manage_blog']
    }
  },
  //{path: 'blog-single-post', component: BlogSinglePostComponent},
  {
    path: 'admin-blog', component: AdminBlogComponent, canActivate: [AuthGuardGuard],
    data: {
      permission: ['access_manage_blog']
    }
  },
  {
    path: 'admin-blog-single-post/:slug', component: AdminBlogSinglePostComponent, canActivate: [AuthGuardGuard],
    data: {
      permission: ['access_manage_blog']
    }
  },
  {path: 'verify-details', component:  VerifyDetailsComponent, canActivate: [VerifyGuardGuard]},
  {path: 'emi-calculator', component: EmiCalculatorComponent},
  {path: 'plans', component: SubscriptionPlansComponent, canActivate:  [UserLoggsGuard],
    data: {
      type: 'plans_page'
    } 
  },
  {path: 'intellectual-property-disclaimer', component: IpDisclaimerComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'terms-conditions', component: TermsConditionsComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'update-property-rent/:id', component: UpdatepropertyComponent},
  {path: 'update-Property-sales/:id', component: UpdateSalesPropertyComponent},
  {
    path: 'usercreator-new', component: AdminUsercreatorComponent, canActivate: [AuthGuardGuard],
    data: {
      permission: ['access_user_creator']
    }
  },
  {
    path: 'usercreator-edit/:slug', component: AdminUsercreatorComponent, canActivate: [AuthGuardGuard],
    data: {
      permission: ['access_user_creator']
    }
  },
  { path: 'internal-users-panel', component: InternalUsersPanelComponent },
  {
    path: 'create-roles', component: CreateRolesComponent, canActivate: [AuthGuardGuard],
    data: {
      permission: ['access_manage_roles']
    }
  },
  {
    path: 'edit-roles/:id', component: CreateRolesComponent, canActivate: [AuthGuardGuard],
    data: {
      permission: ['access_manage_roles']
    }
  },
  {
    path: 'manage-roles', component: ManageRolesComponent, canActivate: [AuthGuardGuard],
    data: {
      permission: ['access_manage_roles']
    }
  },
  {
    path: 'view-roles/:id', component: ViewRolesComponent, canActivate: [AuthGuardGuard],
    data: {
      permission: ['access_manage_roles']
    }
  },
  {path: 'access-denied', component: AccessDeniedComponent },
  {path: 'insertproduct-sale', component: InsertproductSaleComponent, canActivate: [VerifyDetailsGuard]},
  {path: 'insertproduct-rent', component: InsertproductRentComponent, canActivate: [VerifyDetailsGuard]},
  {path:'local-service', component: LocalserviceComponent},
  {path: '**', component: NotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
