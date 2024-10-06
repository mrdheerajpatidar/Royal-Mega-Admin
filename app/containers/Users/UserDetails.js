import React from 'react';

const UserDetails = () => {
  return (
    <>hyyy i am here</>
    // <div>
    //   <div className="fixed inset-0 overflow-y-auto">
    //     <div className="flex w-full min-h-full items-center justify-center p-4 text-center">
    //       <div className="flex gap-5 items-center">
    //         <div className="rounded-full overflow-hidden w-[74px] aspect-square">
    //           {/* {data?.profileImage === null ? (
    //                     <img src="/images/default-profile.png" alt="" />
    //                   ) : (
    //                     <img src={data?.profileImage} alt="" />
    //                   )} */}
    //           <img src="" alt="profile" />
    //         </div>
    //         <h4 className="text-20 font-semibold mx-3">
    //           {/* {data.firstname + ' ' + data.lastname} */}
    //           fillName
    //         </h4>
    //       </div>
    //       <div className="mt-5">
    //         <div className="flex gap-2 items-center">
    //           <div className="w-[43px]">
    //             <img src="/images/account_circle.png" alt="" />
    //           </div>
    //           <h4 className="text-22 capitalize font-semibold mx-3">
    //             Personal Details
    //           </h4>
    //         </div>
    //         <div className="pl-5 pt-4 flex flex-col gap-1">
    //           <div className="flex">
    //             <div className="flex items-center gap-[10px]">
    //               {/* <span
    //                         className={`${
    //                           data.firstname === '' || data.firstname === null
    //                             ? 'text-red-10'
    //                             : 'text-green-100'
    //                         }`}
    //                       >
    //                         {data.firstname === '' || data.firstname === null
    //                           ? reactIcons.block
    //                           : reactIcons.checkMark}
    //                       </span> */}
    //               <div className="w-96 text-start">Given Name</div>
    //             </div>
    //             <div className=""> firstname</div>
    //           </div>
    //           <div className="flex">
    //             <div className="flex items-center gap-[10px]">
    //               {/* <span
    //                         className={`${
    //                           data.lastname === '' || data.lastname === null
    //                             ? 'text-red-10'
    //                             : 'text-green-100'
    //                         }`}
    //                       >
    //                         {data.lastname === '' || data.lastname === null
    //                           ? reactIcons.block
    //                           : reactIcons.checkMark}
    //                       </span> */}
    //               <div className="w-96 text-start">Last Name</div>
    //             </div>
    //             <div className=""> lastName</div>
    //           </div>
    //           <div className="flex">
    //             <div className="flex items-center gap-[10px]">
    //               {/* <span
    //                         className={`${
    //                           data.dob === '' || data.dob === null
    //                             ? 'text-red-10'
    //                             : 'text-green-100'
    //                         }`}
    //                       >
    //                         {data.dob === '' || data.dob === null
    //                           ? reactIcons.block
    //                           : reactIcons.checkMark}
    //                       </span> */}

    //               <div className="w-96 text-start">Date of Birth</div>
    //             </div>
    //             17/12/2000
    //             {/* <div className="">{moment(data.dob).format('L')}</div> */}
    //           </div>
    //           <div className="flex">
    //             <div className="flex items-center gap-[10px]">
    //               {/* <span
    //                         className={`${
    //                           data?.verificationInfo?.accountOpeningPurpose ===
    //                             '' ||
    //                           data?.verificationInfo?.accountOpeningPurpose ===
    //                             null
    //                             ? 'text-yellow-100'
    //                             : 'text-green-100'
    //                         }`}
    //                       >
    //                         {data?.verificationInfo?.accountOpeningPurpose ===
    //                           '' ||
    //                         data?.verificationInfo?.accountOpeningPurpose ===
    //                           null
    //                           ? reactIcons.block
    //                           : reactIcons.checkMark}
    //                       </span> */}
    //               hello purpose
    //               <div className="w-96 text-start">
    //                 Purpose of opening account (optional)
    //               </div>
    //             </div>
    //             <div className="">
    //               {/* {data?.verificationInfo?.accountOpeningPurpose} */}
    //               purpose
    //             </div>
    //           </div>
    //           <div className="flex">
    //             <div className="flex items-center gap-[10px]">
    //               {/* <span
    //                         className={`${
    //                           data?.verificationInfo?.company?.name === '' ||
    //                           data?.verificationInfo?.company?.name === null
    //                             ? 'text-yellow-100'
    //                             : 'text-green-100'
    //                         }`}
    //                       >
    //                         {data?.verificationInfo?.company?.name === '' ||
    //                         data?.verificationInfo?.company?.name === null
    //                           ? reactIcons.block
    //                           : reactIcons.checkMark}
    //                       </span> */}
    //               company name
    //               <div className="w-96 text-start">Company Name</div>
    //             </div>
    //             <div className="">
    //               hello Company
    //               {/* {data?.verificationInfo?.company?.name} */}
    //             </div>
    //           </div>
    //           <div className="flex">
    //             <div className="flex items-center gap-[10px]">
    //               {/* <span
    //                         className={`${
    //                           data?.verificationInfo?.company?.role === '' ||
    //                           data?.verificationInfo?.company?.role === null
    //                             ? 'text-yellow-100'
    //                             : 'text-green-100'
    //                         }`}
    //                       >
    //                         {data?.verificationInfo?.company?.role === '' ||
    //                         data?.verificationInfo?.company?.role === null
    //                           ? reactIcons.block
    //                           : reactIcons.checkMark}
    //                       </span> */}
    //               roles
    //               <div className="w-96 text-start">Role Within the Company</div>
    //             </div>
    //             {/* {data?.verificationInfo?.company?.role} */}
    //             role manaer
    //             <div className=""></div>
    //           </div>
    //           <div className="flex">
    //             <div className="flex items-center gap-[10px]">
    //               {/* <span
    //                         className={`${
    //                           data?.verificationInfo?.company
    //                             ?.registrationNumber === '' ||
    //                           data?.verificationInfo?.company
    //                             ?.registrationNumber === null
    //                             ? 'text-yellow-100'
    //                             : 'text-green-100'
    //                         }`}
    //                       >
    //                         {data?.verificationInfo?.company
    //                           ?.registrationNumber === '' ||
    //                         data?.verificationInfo?.company
    //                           ?.registrationNumber === null
    //                           ? reactIcons.block
    //                           : reactIcons.checkMark}
    //                       </span> */}

    //               <div className="w-96 text-start">
    //                 Company registration number
    //               </div>
    //             </div>
    //             {/* {data?.verificationInfo?.company?.registrationNumber} */}
    //             +917389276575
    //             <div className=""></div>
    //           </div>
    //         </div>
    //         <div className="flex gap-2 items-center mt-6">
    //           <div className="w-[43px]">
    //             <img src="/images/add_location.png" alt="" />
    //           </div>
    //           <h4 className="text-22 capitalize font-semibold mx-3">
    //             ADDRESS DETAILS
    //           </h4>
    //         </div>
    //         <div className="pl-5 pt-4 flex flex-col gap-1">
    //           <div className="flex">
    //             <div className="flex items-center gap-[10px]">
    //               {/* <span
    //                         className={`${
    //                           data?.verificationInfo?.address?.country === '' ||
    //                           data?.verificationInfo?.address?.country === null
    //                             ? 'text-red-10'
    //                             : 'text-green-100'
    //                         }`}
    //                       >
    //                         {data?.verificationInfo?.address?.country === '' ||
    //                         data?.verificationInfo?.address?.country === null
    //                           ? reactIcons.block
    //                           : reactIcons.checkMark}
    //                       </span> */}

    //               <div className="w-96 text-start">Country</div>
    //             </div>
    //             {/* {data?.verificationInfo?.address?.country} */}
    //             country
    //             <div className=""></div>
    //           </div>
    //           <div className="flex">
    //             <div className="flex items-center gap-[10px]">
    //               {/* <span
    //                         className={`${
    //                           data?.verificationInfo?.address?.state === '' ||
    //                           data?.verificationInfo?.address?.state === null
    //                             ? 'text-red-10'
    //                             : 'text-green-100'
    //                         }`}
    //                       >
    //                         {data?.verificationInfo?.address?.state === '' ||
    //                         data?.verificationInfo?.address?.state === null
    //                           ? reactIcons.block
    //                           : reactIcons.checkMark}
    //                       </span> */}

    //               <div className="w-96 text-start">State/Province</div>
    //             </div>
    //             {/* {data?.verificationInfo?.address?.state} */}
    //             state
    //             <div className=""></div>
    //           </div>
    //           <div className="flex">
    //             <div className="flex items-center gap-[10px]">
    //               {/* <span
    //                         className={`${
    //                           data?.verificationInfo?.address?.city === '' ||
    //                           data?.verificationInfo?.address?.city === null
    //                             ? 'text-red-10'
    //                             : 'text-green-100'
    //                         }`}
    //                       >
    //                         {data?.verificationInfo?.address?.city === '' ||
    //                         data?.verificationInfo?.address?.city === null
    //                           ? reactIcons.block
    //                           : reactIcons.checkMark}
    //                       </span> */}
    //               <div className="w-96 text-start">City</div>
    //             </div>
    //             {/* {data?.verificationInfo?.address?.city} */}city
    //             <div className=""></div>
    //           </div>
    //           <div className="flex">
    //             <div className="flex items-center gap-[10px]">
    //               {/* <span
    //                         className={`${
    //                           data?.verificationInfo?.address?.street === '' ||
    //                           data?.verificationInfo?.address?.street === null
    //                             ? 'text-red-10'
    //                             : 'text-green-100'
    //                         }`}
    //                       >
    //                         {data?.verificationInfo?.address?.street === '' ||
    //                         data?.verificationInfo?.address?.street === null
    //                           ? reactIcons.block
    //                           : reactIcons.checkMark}
    //                       </span> */}
    //               <div className="w-96 text-start">Street Address</div>
    //             </div>
    //             {/* {data?.verificationInfo?.address?.street} */}street
    //             <div className=""></div>
    //           </div>
    //           <div className="flex">
    //             <div className="flex items-center gap-[10px]">
    //               {/* <span
    //                         className={`${
    //                           data?.verificationInfo?.address?.postalCode ===
    //                             '' ||
    //                           data?.verificationInfo?.address?.postalCode ===
    //                             null
    //                             ? 'text-red-10'
    //                             : 'text-green-100'
    //                         }`}
    //                       >
    //                         {data?.verificationInfo?.address?.postalCode ===
    //                           '' ||
    //                         data?.verificationInfo?.address?.postalCode === null
    //                           ? reactIcons.block
    //                           : reactIcons.checkMark}
    //                       </span> */}
    //               <div className="w-96 text-start">Postal Code/ZIP</div>
    //             </div>
    //             {/* {data?.verificationInfo?.address?.postalCode} */}
    //             postalCode
    //             <div className=""></div>
    //           </div>
    //         </div>
    //         <div className="flex gap-2 items-center mt-6">
    //           <div className="w-[43px]">
    //             <img src="/images/upload_file.png" alt="" />
    //           </div>
    //           <h4 className="text-22 capitalize font-semibold mx-3">
    //             DOCUMENTS
    //           </h4>
    //         </div>
    //         <div className="pl-5 pt-4 flex flex-col gap-1">
    //           <div className="flex">
    //             <div className="flex items-center gap-[10px]">
    //               {/* <span
    //                         className={`${
    //                           data?.verificationInfo?.document?.governmentId ===
    //                             '' ||
    //                           data?.verificationInfo?.document?.governmentId ===
    //                             null
    //                             ? 'text-red-10'
    //                             : 'text-green-100'
    //                         }`}
    //                       >
    //                         {data?.verificationInfo?.document?.governmentId ===
    //                           '' ||
    //                         data?.verificationInfo?.document?.governmentId ===
    //                           null
    //                           ? reactIcons.block
    //                           : reactIcons.checkMark}
    //                       </span> */}
    //               <div className="w-96 text-start">Proof of Identification</div>
    //             </div>
    //             {/* <div className="">
    //                       {data?.verificationInfo?.document?.governmentId ===
    //                         '' ||
    //                       data?.verificationInfo?.document?.governmentId ===
    //                         null ? (
    //                         'NA'
    //                       ) : (
    //                         <div
    //                           className="w-[100px] cursor-pointer"
    //                           onClick={() =>
    //                             openImageModal(
    //                               data?.verificationInfo?.document
    //                                 ?.governmentId,
    //                             )
    //                           }
    //                         >
    //                           <img
    //                             src={
    //                               data?.verificationInfo?.document?.governmentId
    //                             }
    //                             className="object-contain"
    //                             alt=""
    //                           />
    //                         </div>
    //                       )}
    //                     </div> */}
    //             ID SEction
    //           </div>
    //           {/* <div className="flex">
    //                     <div className="flex items-center gap-[10px]">
    //                       <span
    //                         className={`${
    //                           data?.verificationInfo?.document?.addressProof ===
    //                             '' ||
    //                           data?.verificationInfo?.document?.addressProof ===
    //                             null
    //                             ? 'text-red-10'
    //                             : 'text-green-100'
    //                         }`}
    //                       >
    //                         {data?.verificationInfo?.document?.addressProof ===
    //                           '' ||
    //                         data?.verificationInfo?.document?.addressProof ===
    //                           null
    //                           ? reactIcons.block
    //                           : reactIcons.checkMark}
    //                       </span>
    //                       <div className="w-96 text-start">
    //                         Proof of Address
    //                       </div>
    //                     </div>
    //                     <div className="">
    //                       {' '}
    //                       {data?.verificationInfo?.document?.addressProof ===
    //                         '' ||
    //                       data?.verificationInfo?.document?.addressProof ===
    //                         null ? (
    //                         'NA'
    //                       ) : (
    //                         <div
    //                           className="w-[100px] cursor-pointer"
    //                           onClick={() =>
    //                             openImageModal(
    //                               data?.verificationInfo?.document
    //                                 ?.addressProof,
    //                             )
    //                           }
    //                         >
    //                           <img
    //                             src={
    //                               data?.verificationInfo?.document?.addressProof
    //                             }
    //                             className="object-contain"
    //                             alt=""
    //                           />
    //                         </div>
    //                       )}{' '}
    //                     </div>
    //                   </div> */}
    //           {/* <div className="flex">
    //                     <div className="flex items-center gap-[10px]">
    //                       <span
    //                         className={`${
    //                           data?.verificationInfo?.document
    //                             ?.companyRegistrationProof
    //                             ? 'text-green-100'
    //                             : 'text-yellow-100'
    //                         }`}
    //                       >
    //                         {data?.verificationInfo?.document
    //                           ?.companyRegistrationProof
    //                           ? reactIcons.checkMark
    //                           : reactIcons.block}
    //                       </span>

    //                       <div className="w-96 text-start">
    //                         Proof of Company Registration (Optional)
    //                       </div>
    //                     </div>
    //                     <div className="">
    //                       {' '}
    //                       {data?.verificationInfo?.document
    //                         ?.companyRegistrationProof ? (
    //                         <div
    //                           className="w-[100px] cursor-pointer"
    //                           onClick={() =>
    //                             openImageModal(
    //                               data?.verificationInfo?.document
    //                                 ?.companyRegistrationProof,
    //                             )
    //                           }
    //                         >
    //                           <img
    //                             src={
    //                               data?.verificationInfo?.document
    //                                 ?.companyRegistrationProof
    //                             }
    //                             className="object-contain"
    //                             alt=""
    //                           />
    //                         </div>
    //                       ) : (
    //                         'NA'
    //                       )}{' '}
    //                     </div>
    //                   </div> */}
    //           {/* <div className="flex">
    //                     <div className="flex items-center gap-[10px]">
    //                       <span
    //                         className={`${
    //                           data?.verificationInfo?.document
    //                             ?.memorandumOfAssociation
    //                             ? 'text-green-100'
    //                             : 'text-yellow-100'
    //                         }`}
    //                       >
    //                         {data?.verificationInfo?.document
    //                           ?.memorandumOfAssociation
    //                           ? reactIcons.checkMark
    //                           : reactIcons.block}
    //                       </span>
    //                       <div className="w-96 text-start">
    //                         Memorandum of Association (Optional)
    //                       </div>
    //                     </div>
    //                     <div className="">
    //                       {' '}
    //                       {data?.verificationInfo?.document
    //                         ?.memorandumOfAssociation ? (
    //                         <div
    //                           className="w-[100px] cursor-pointer"
    //                           onClick={() =>
    //                             openImageModal(
    //                               data?.verificationInfo?.document
    //                                 ?.memorandumOfAssociation,
    //                             )
    //                           }
    //                         >
    //                           <img
    //                             src={
    //                               data?.verificationInfo?.document
    //                                 ?.memorandumOfAssociation
    //                             }
    //                             className="object-contain"
    //                             alt=""
    //                           />
    //                         </div>
    //                       ) : (
    //                         'NA'
    //                       )}{' '}
    //                     </div>
    //                   </div> */}
    //           {/* {data?.verificationRejectionReason !== null && ( */}
    //           <div className="flex mt-10 mb-5">
    //             <div className="flex items-center gap-[10px]">
    //               <span className="text-red-10">{reactIcons.block}</span>
    //               <div className="w-96 text-start">Rejection Reason</div>
    //             </div>
    //             <div className=""> {data?.verificationRejectionReason}</div>
    //           </div>
    //           {/* )} */}
    //         </div>
    //       </div>
    //       {/* {data?.verificationStatus === 'Pending' && */}
    //       {!rejectButtonClicked && (
    //         <div className="flex mt-5 items-center gap-4 justify-end">
    //           <button
    //             onClick={() => handleApproved()}
    //             className="btn-primary-outline h-[42px] w-[155px]"
    //           >
    //             Approved
    //           </button>
    //           <div className="w-[155px] h-[42px]">
    //             <BluePinkButton
    //               Btnclick={handleRejectButtonClick}
    //               text={'Reject'}
    //             />
    //           </div>
    //         </div>
    //       )}
    //       {/* {showRejectionDescription && (
    //         <>
    //           <form>
    //             <div className="mt-5 flex flex-col gap-2">
    //               <label htmlFor="Rejection" className="text-start">
    //                 Rejection description
    //               </label>
    //               <textarea
    //                 name="Rejection description"
    //                 id="Rejection"
    //                 cols="30"
    //                 onChange={(e) => setRejectReason(e.target.value)}
    //                 rows="10"
    //                 value=""
    //                 required
    //                 className="resize-none custom-scroll"
    //               ></textarea>
    //             </div>
    //             <div className="flex mt-5 items-center gap-4 justify-end">
    //               <div className="w-[155px] h-[42px]">
    //                 <BluePinkButton
    //                   Btnclick={() => handleRejected(data.id)}
    //                   text={'Reject'}
    //                 />
    //               </div>
    //             </div>
    //           </form>
    //         </>
    //       )} */}
    //     </div>
    //   </div>
    // </div>
  );
};
// UserDetails.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   closeModal: PropTypes.func.isRequired,
//   data: PropTypes.object.isRequired,
//   notClose: PropTypes.func.isRequired,
//   setRefetch: PropTypes.func.isRequired,
// };
export default UserDetails;
